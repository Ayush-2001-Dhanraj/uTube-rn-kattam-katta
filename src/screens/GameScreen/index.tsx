import {
  Animated,
  Dimensions,
  Easing,
  Image,
  SafeAreaView,
  Vibration,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackList} from '../../App';
import Heading from '../../components/Heading';
import Board from '../../components/Board';
import ActionSection from '../../components/ActionSection';
import FastImage from 'react-native-fast-image';

import {
  BoardElement,
  CIRCLE_WHITE_IMG,
  CROSS_WHITE_IMG,
  HARD_PROBABILITY,
  MID_PROBABILITY,
  MODE,
  MODE_LOGOS,
  ScoreInterface,
} from '../../constants';
import styles from './styles';
import SoundService from '../../SoundService';
import {useFocusEffect} from '@react-navigation/native';
import COLORS from '../../colors';

type GameScreenProps = NativeStackScreenProps<RootStackList, 'Game'>;

const GameScreen = ({route}: GameScreenProps) => {
  const {currentMode} = route.params;

  const [boardElements, setBoardElements] = useState<BoardElement[]>(
    new Array(9).fill('empty', 0, 9),
  );
  const [isCross, setIsCross] = useState(true);
  const [winner, setWinner] = useState('');
  const [winningCombination, setWinningCombination] = useState<number[]>([]);
  const isMounted = useRef(false);

  const [scores, setScores] = useState<ScoreInterface>({cross: 0, circle: 0});
  const [round, setRound] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [artworks, setArtworks] = useState<any[]>([]);

  const [currentHero, setCurrentHero] = useState();
  const [currentOtherHero, setCurrentOtherHero] = useState();
  const [currentBot, setCurrentBot] = useState<null | any>();

  const [playOverAnime, setPlayOverAnime] = useState(false);
  const [showHeroA, setShowHeroA] = useState(false);
  const [showHeroB, setShowHeroB] = useState(false);

  const handleCellPress = (index: number) => {
    Vibration.vibrate(100);
    if (SoundService.sounds['tap']) {
      SoundService.sounds['tap'].setVolume(1); // Set volume (0.0 to 1.0)
      SoundService.playSound('tap');
    }
    setIsLoading(true);
    setBoardElements(preV => {
      const newBoard = [...preV];
      newBoard[index] = isCross ? 'cross' : 'circle';
      return newBoard;
    });
    if ([MODE.SINGLES, MODE.MULTI].includes(currentMode)) {
      setArtworks(preV => [
        ...preV,
        isCross ? CROSS_WHITE_IMG : CIRCLE_WHITE_IMG,
      ]);
    } else {
      const modeInfo = MODE_LOGOS.find(x => x.key === currentMode);
      setArtworks(preV => [
        ...preV,
        isCross ? modeInfo?.left : modeInfo?.right,
      ]);
    }

    // For next  player
    setIsCross(preV => !preV);
  };

  const checkIsGameOver = () => {
    // Draw condition
    const winningCombinations = [
      [0, 1, 2], // Row 1
      [3, 4, 5], // Row 2
      [6, 7, 8], // Row 3
      [0, 3, 6], // Column 1
      [1, 4, 7], // Column 2
      [2, 5, 8], // Column 3
      [0, 4, 8], // Diagonal 1
      [2, 4, 6], // Diagonal 2
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;

      if (
        boardElements[a] !== 'empty' &&
        boardElements[a] === boardElements[b] &&
        boardElements[a] === boardElements[c]
      ) {
        const win = boardElements[a];
        setWinner(win);
        setWinningCombination(combination);
        setScores(preV => ({
          ...preV,
          [win]: preV[win] + 1,
        }));
        return;
      }
    }

    if (!boardElements.includes('empty') && !winner) {
      setWinner('Draw');
    }

    setIsLoading(false);
  };

  const checkWinningCondition = (board: BoardElement[], symbol: string) => {
    const winningCombinations = [
      [0, 1, 2], // Row 1
      [3, 4, 5], // Row 2
      [6, 7, 8], // Row 3
      [0, 3, 6], // Column 1
      [1, 4, 7], // Column 2
      [2, 5, 8], // Column 3
      [0, 4, 8], // Diagonal 1
      [2, 4, 6], // Diagonal 2
    ];

    return winningCombinations.some(([a, b, c]) => {
      return board[a] === symbol && board[b] === symbol && board[c] === symbol;
    });
  };

  const evaluateBoard = (board: BoardElement[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;

      // Check if all three cells in the line are the same and not empty
      if (
        board[a] !== 'empty' &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return board[a]; // Return the winner ('circle' or 'cross')
      }
    }

    // Check for a draw
    if (!board.includes('empty')) {
      return 'draw'; // No spaces left, it's a draw
    }

    // No winner yet
    return null; // Game is still ongoing
  };

  const handleHeroIntros = () => {
    setShowHeroA(true);

    setTimeout(() => {
      setShowHeroA(false);
      setShowHeroB(true);
    }, 2000);

    setTimeout(() => {
      setShowHeroB(false);
    }, 4000);
  };

  const handleReset = () => {
    setBoardElements(new Array(9).fill('empty', 0, 9));
    setWinner('');
    setScores({cross: 0, circle: 0});
    setWinningCombination([]);
    setRound(1);
    setArtworks([]);
    getNewHeroes();
    handleHeroIntros();
  };

  const handleNext = () => {
    setBoardElements(new Array(9).fill('empty', 0, 9));
    setWinner('');
    setWinningCombination([]);
    setRound(preV => preV + 1);
  };

  const getAvailableIndexes = () =>
    boardElements
      .map((value, index) => (value === 'empty' ? index : null))
      .filter(mappedValue => mappedValue !== null);

  const makeRandomChoice = () => {
    // get indexes of empty cells
    const availableIndexes = getAvailableIndexes();
    // choose a random cell from available cells
    handleCellPress(
      availableIndexes[Math.floor(Math.random() * availableIndexes.length)],
    );
  };

  const makeSmarterChoice = () => {
    const availableIndexes = getAvailableIndexes();

    // winning move
    for (const index of availableIndexes) {
      const tempBoard = [...boardElements];
      tempBoard[index] = 'circle';
      if (checkWinningCondition(tempBoard, 'circle')) {
        handleCellPress(index);
        return;
      }
    }

    // blocking move
    for (const index of availableIndexes) {
      const tempBoard = [...boardElements];
      tempBoard[index] = 'cross';
      // Means the player is about to win if they make this move, so block them
      if (checkWinningCondition(tempBoard, 'cross')) {
        handleCellPress(index);
        return;
      }
    }

    // Strategic move: Center > Corners > Edges
    const center = 4;
    if (availableIndexes.includes(center)) {
      handleCellPress(4);
      return;
    }

    const corners = [0, 2, 6, 8];
    for (const index of corners) {
      if (availableIndexes.includes(index)) {
        handleCellPress(index);
        return;
      }
    }

    // random fallback
    handleCellPress(
      availableIndexes[Math.floor(Math.random() * availableIndexes.length)],
    );
  };

  const heuristicEvaluation = (board: BoardElement[]): number => {
    let score = 0;
    const winningCombinations = [
      [0, 1, 2], // Row 1
      [3, 4, 5], // Row 2
      [6, 7, 8], // Row 3
      [0, 3, 6], // Column 1
      [1, 4, 7], // Column 2
      [2, 5, 8], // Column 3
      [0, 4, 8], // Diagonal 1
      [2, 4, 6], // Diagonal 2
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      const lineSymbols = [board[a], board[b], board[c]];

      // Favour lines closer to winning
      if (
        lineSymbols.filter(symbol => symbol === 'circle').length == 2 &&
        lineSymbols.includes('empty')
      )
        score += 5;

      // penalize lines closer to opponent winning
      if (
        lineSymbols.filter(symbol => symbol === 'cross').length == 2 &&
        lineSymbols.includes('empty')
      )
        score -= 5;
    }

    return score;
  };

  const minMax = (
    board: BoardElement[],
    depth: number,
    isMaximizing: boolean,
    alpha: number,
    beta: number,
    maxDepth: number,
  ): number => {
    const winner = evaluateBoard(board);

    if (winner === 'circle') return 10 - depth; // Bot Wins
    if (winner === 'cross') return depth - 10; // opponent Wins
    if (winner === 'draw') return 0; // Draw

    if (depth >= maxDepth) return heuristicEvaluation(board);

    if (isMaximizing) {
      // current turn is of that of bot and we need to be to of maximum score
      let maxEval = -Infinity;
      board.forEach((value, index) => {
        if (value === 'empty') {
          board[index] = 'circle';
          const eva = minMax(board, depth + 1, false, alpha, beta, maxDepth);
          board[index] = 'empty';
          maxEval = Math.max(maxEval, eva);
          alpha = Math.max(alpha, eva);
          if (beta <= alpha) return maxEval;
        }
      });
      return maxEval;
    } else {
      // current turn is of that of opponent and we need to be to of minimum score
      let minEval = Infinity;
      board.forEach((value, index) => {
        if (value === 'empty') {
          board[index] = 'cross';
          const eva = minMax(board, depth + 1, true, alpha, beta, maxDepth);
          board[index] = 'empty';
          minEval = Math.min(minEval, eva);
          beta = Math.min(beta, eva);
          if (beta <= alpha) return minEval;
        }
      });
      return minEval;
    }
  };

  const findBestMove = () => {
    let bestMove = -1;
    let bestScore = -Infinity;
    const maxDepth = 4;

    const tempBoard = [...boardElements];

    const availableIndexes = getAvailableIndexes();

    for (const index of availableIndexes) {
      tempBoard[index] = 'circle';
      const moveScore = minMax(
        tempBoard,
        0,
        false,
        -Infinity,
        Infinity,
        maxDepth,
      );
      tempBoard[index] = 'empty';
      if (moveScore > bestScore) {
        bestScore = moveScore;
        bestMove = index;
      }
    }

    if (bestMove !== -1) handleCellPress(bestMove);
  };

  const botMoveLogic = () => {
    if (currentMode === MODE.BOT_EASY) {
      makeRandomChoice();
    } else if (currentMode === MODE.BOT_MID) {
      Math.random() <= MID_PROBABILITY
        ? makeSmarterChoice()
        : makeRandomChoice();
    } else {
      Math.random() <= HARD_PROBABILITY ? findBestMove() : makeRandomChoice();
    }
  };

  const handleBotTurn = useCallback(() => {
    // if isCross is false then it means bot's turn
    if (!isCross && currentMode.includes('BOT') && !isLoading && !winner) {
      if (SoundService.sounds['calculate']) {
        SoundService.sounds['calculate'].setVolume(1); // Set volume (0.0 to 1.0)
        SoundService.playSound('calculate');
      }
      const botMoveTimer = setTimeout(() => {
        // Bot's move logic
        botMoveLogic();
        if (SoundService.sounds['calculate']) {
          SoundService.sounds['calculate'].setVolume(1); // Set volume (0.0 to 1.0)
          SoundService.stopSound('calculate');
        }
      }, 2000); // Simulate thinking time

      return () => clearTimeout(botMoveTimer); // Cleanup timer on dependency change
    }
  }, [isCross, isLoading, winner, currentMode]);

  const getNewHeroes = () => {
    const leftHeroes = [
      require('../../assets/images/hero_2.png'),
      require('../../assets/images/hero_5.png'),
      require('../../assets/images/hero_4.png'),
      require('../../assets/images/hero_1.png'),
      require('../../assets/images/hero_6.png'),
    ];
    const rightHeroes = [
      require('../../assets/images/hero_3.png'),
      require('../../assets/images/hero_7.png'),
      require('../../assets/images/hero_1.png'),
      require('../../assets/images/hero_6.png'),
    ];

    const bots = [
      require('../../assets/images/bot_1.png'),
      require('../../assets/images/bot_2.png'),
      require('../../assets/images/bot_3.png'),
      require('../../assets/images/bot_4.png'),
    ];

    if ([MODE.AI_BOT, MODE.BOT_EASY, MODE.BOT_MID].includes(currentMode)) {
      setCurrentBot(bots[Math.floor(Math.random() * bots.length)]);
    } else {
      setCurrentBot(null);
    }
    setCurrentHero(rightHeroes[Math.floor(Math.random() * rightHeroes.length)]);
    setCurrentOtherHero(
      leftHeroes[Math.floor(Math.random() * leftHeroes.length)],
    );
  };

  useEffect(() => {
    if (isMounted.current) checkIsGameOver();
    else isMounted.current = true;
  }, [boardElements]);

  useEffect(() => {
    handleReset();
  }, [currentMode]);

  useEffect(() => {
    handleBotTurn();
  }, [handleBotTurn]);

  useEffect(() => {
    if (winner) {
      if (winner === 'Draw') {
        if (SoundService.sounds['draw']) {
          SoundService.sounds['draw'].setVolume(1); // Set volume (0.0 to 1.0)
          SoundService.playSound('draw');
        }
      } else if (
        [MODE.AI_BOT, MODE.BOT_EASY, MODE.BOT_MID].includes(currentMode) &&
        winner === 'circle'
      ) {
        setPlayOverAnime(true);
        setTimeout(() => {
          setPlayOverAnime(false);
        }, 5000);

        if (SoundService.sounds['lost']) {
          SoundService.sounds['lost'].setVolume(1); // Set volume (0.0 to 1.0)
          SoundService.playSound('lost');
        }
      } else {
        if (SoundService.sounds['win']) {
          SoundService.sounds['win'].setVolume(1); // Set volume (0.0 to 1.0)
          SoundService.playSound('win');
        }
      }
    }
  }, [winner]);

  useFocusEffect(
    useCallback(() => {
      if (!winner && SoundService.sounds['game']) {
        SoundService.sounds['game'].setVolume(1); // Set volume (0.0 to 1.0)
        SoundService.sounds['game'].setNumberOfLoops(-1); // Loop indefinitely
        SoundService.playSound('game');
      }

      return () => {
        SoundService.stopSound('game'); // Stop when navigating away
      };
    }, [winner]),
  );

  useEffect(() => {
    if (winner) {
      SoundService.stopSound('game');
    }
  }, [winner]);

  useEffect(() => {
    getNewHeroes();
    handleHeroIntros();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.app}>
        {playOverAnime && (
          <FastImage
            resizeMode="cover"
            style={{
              position: 'absolute',
              top: 0,
              zIndex: 100,
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
            }}
            source={require('../../assets/gifs/game-over-animation.gif')}
          />
        )}

        {(showHeroA || showHeroB) && (
          <>
            <View
              style={{
                position: 'absolute',
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
                backgroundColor: 'black',
                zIndex: 100,
              }}
            />
            {showHeroA && (
              <Animated.View style={[styles.heroImageContainer]}>
                <Image
                  source={currentBot || currentOtherHero}
                  style={{
                    height: Dimensions.get('window').height * 2,
                    width: Dimensions.get('window').width,
                  }}
                />
              </Animated.View>
            )}

            {showHeroB && (
              <Animated.View style={[styles.otherHeroImageContainer]}>
                <Image
                  source={currentHero}
                  style={{
                    height: Dimensions.get('window').height * 2,
                    width: Dimensions.get('window').width,
                  }}
                />
              </Animated.View>
            )}
          </>
        )}

        <Heading scores={scores} currentMode={currentMode} round={round} />

        <Board
          boardElements={boardElements}
          isCross={isCross}
          winner={winner}
          onPressCell={handleCellPress}
          winningCombination={winningCombination}
          disabled={(currentMode.includes('BOT') && !isCross) || isLoading}
          currentMode={currentMode}
          scores={scores}
          currentHero={currentHero}
          currentOtherHero={currentOtherHero}
          currentBot={currentBot}
        />

        <ActionSection
          winner={winner}
          currentMode={currentMode}
          handleReset={handleReset}
          handleNext={handleNext}
          artworks={artworks}
        />
      </SafeAreaView>
    </>
  );
};

export default GameScreen;
