import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {BoardElement, MODE, ScoreInterface} from './constants';
import ModeSelector from './components/ModeSelector';
import Board from './components/Board';
import Heading from './components/Heading';
import WinnerText from './components/WinnerText';
import ActionSection from './components/ActionSection';

const App = () => {
  const [boardElements, setBoardElements] = useState<BoardElement[]>(
    new Array(9).fill('empty', 0, 9),
  );
  const [isCross, setIsCross] = useState(true);
  const [winner, setWinner] = useState('');
  const [winningCombination, setWinningCombination] = useState<number[]>([]);
  const isMounted = useRef(false);
  const [currentMode, setCurrentMode] = useState<MODE>(MODE.SINGLES);
  const [scores, setScores] = useState<ScoreInterface>({cross: 0, circle: 0});
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const [round, setRound] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCellPress = (index: number) => {
    setIsLoading(true);
    setBoardElements(preV => {
      const newBoard = [...preV];
      newBoard[index] = isCross ? 'cross' : 'circle';
      return newBoard;
    });
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

  const handleReset = () => {
    setBoardElements(new Array(9).fill('empty', 0, 9));
    setWinner('');
    setScores({cross: 0, circle: 0});
    setWinningCombination([]);
    setRound(1);
    setIsCross(true);
  };

  const handleNext = () => {
    setBoardElements(new Array(9).fill('empty', 0, 9));
    setWinner('');
    setWinningCombination([]);
    setRound(preV => preV + 1);
  };

  const makeRandomChoice = () => {
    // get indexes of empty cells
    const availableIndexes = [];
    for (let i = 0; i < boardElements.length; i++) {
      if (boardElements[i] === 'empty') {
        availableIndexes.push(i);
      }
    }
    // choose a random cell from available cells
    handleCellPress(
      availableIndexes[Math.floor(Math.random() * availableIndexes.length)],
    );
  };

  const toggleModel = () => setModalVisible(preV => !preV);

  const handleModeChange = (newMode: keyof typeof MODE) =>
    setCurrentMode(MODE[newMode]);

  useEffect(() => {
    if (isMounted.current) checkIsGameOver();
    else isMounted.current = true;
  }, [boardElements]);

  useEffect(() => {
    handleReset();
  }, [currentMode]);

  useEffect(() => {
    // if isCross is false then it means bot's turn
    if (!isCross && currentMode === MODE.BOT && !isLoading && !winner) {
      setTimeout(() => {
        // To simulate that the bot is thinking
        makeRandomChoice();
      }, 2000);
    }
  }, [isCross, isLoading, currentMode]);

  return (
    <SafeAreaView style={styles.main}>
      <Heading
        scores={scores}
        currentMode={currentMode}
        round={round}
        toggleModel={toggleModel}
      />

      <Board
        boardElements={boardElements}
        isCross={isCross}
        winner={winner}
        onPressCell={handleCellPress}
        winningCombination={winningCombination}
        disabled={(currentMode === MODE.BOT && !isCross) || isLoading}
        currentMode={currentMode}
      />

      <WinnerText winner={winner} scores={scores} currentMode={currentMode} />

      <ActionSection
        winner={winner}
        currentMode={currentMode}
        handleReset={handleReset}
        handleNext={handleNext}
      />

      <ModeSelector
        currentMode={currentMode}
        modalVisible={modalVisible}
        onChangeMode={handleModeChange}
        toggleModel={toggleModel}
        canClose
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    margin: 8,
    gap: 10,
  },
});
