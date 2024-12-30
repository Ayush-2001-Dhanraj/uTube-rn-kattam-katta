import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import EntoTcon from 'react-native-vector-icons/Entypo';
import React, {useEffect, useRef, useState} from 'react';
import Cell from './components/Cell';
import {MODE, ModeToDescription, ScoreInterface} from './constants';
import ModeSelector from './components/ModeSelector';

type BoardElement = 'cross' | 'circle' | 'empty';

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

  const handleCellPress = (index: number) => {
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
  };

  const handleReset = () => {
    setBoardElements(new Array(9).fill('empty', 0, 9));
    setWinner('');
    setScores({cross: 0, circle: 0});
    setWinningCombination([]);
  };

  const handleNext = () => {
    setBoardElements(new Array(9).fill('empty', 0, 9));
    setWinner('');
    setWinningCombination([]);
  };

  const toggleModel = () => setModalVisible(preV => !preV);

  const handleModeChange = (newMode: keyof typeof MODE) =>
    setCurrentMode(MODE[newMode]);

  useEffect(() => {
    if (isMounted.current) checkIsGameOver();
    else isMounted.current = true;
  }, [boardElements]);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.headingContainer}>
        <View style={styles.headingBox}>
          <EntoTcon size={32} color="#000" name="cross" />

          <Text style={styles.headingTxt}>
            {currentMode === MODE.MULTI && scores.cross}
          </Text>
        </View>
        <TouchableOpacity style={styles.headingBox} onPress={toggleModel}>
          <Text style={styles.heading}>Kattam Katta</Text>
          <Text style={styles.headingTxt}>{currentMode}</Text>
        </TouchableOpacity>
        <View style={styles.headingBox}>
          <EntoTcon size={32} color="#000" name="circle" />
          <Text style={styles.headingTxt}>
            {currentMode === MODE.MULTI && scores.circle}
          </Text>
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{backgroundColor: '#000', padding: 8}}>
          <FlatList
            numColumns={3}
            data={boardElements}
            keyExtractor={(item, index) => index as unknown as string}
            contentContainerStyle={styles.boardBox}
            columnWrapperStyle={styles.boardBox}
            ListHeaderComponent={
              <View>
                <Text>Yo</Text>
              </View>
            }
            renderItem={({item, index}) => {
              const fillColor =
                winner === 'Draw'
                  ? '#C62300'
                  : winningCombination.includes(index)
                  ? '#85A947'
                  : '#fff';

              return (
                <Cell
                  name={item}
                  handlePress={() => {
                    handleCellPress(index);
                  }}
                  disabled={!!winner}
                  fillColor={fillColor}
                />
              );
            }}
          />
        </View>
      </View>

      <Text style={styles.winnerTxt}>
        {winner && `${winner === 'Draw' ? 'No one' : winner} is the winner.`}
      </Text>

      <View style={styles.actionContainer}>
        {currentMode === MODE.SINGLES && (
          <TouchableOpacity
            onPress={handleReset}
            style={[styles.actionBtn, styles.fullWidth]}>
            <Text style={styles.actionTxt}>
              {winner ? 'Re-match' : 'Reset'}
            </Text>
          </TouchableOpacity>
        )}

        {currentMode === MODE.MULTI && (
          <>
            <TouchableOpacity
              onPress={handleReset}
              style={[styles.actionBtn, styles.altBtn]}>
              <Text style={[styles.actionTxt, styles.altTxt]}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!winner}
              onPress={handleNext}
              style={[
                styles.actionBtn,
                styles.fullWidth,
                !winner && styles.disabledBtn,
              ]}>
              <Text style={styles.actionTxt}>Next</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <ModeSelector
        currentMode={currentMode}
        modalVisible={modalVisible}
        onChangeMode={handleModeChange}
        toggleModel={toggleModel}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  altTxt: {
    color: '#000',
  },
  altBtn: {
    backgroundColor: '#fff',
  },
  disabledBtn: {
    opacity: 0.7,
  },
  actionTxt: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  fullWidth: {
    flex: 1,
  },
  smallBtn: {
    flex: 0,
  },
  actionBtn: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  headingBox: {
    gap: 20,
  },
  headingTxt: {
    textAlign: 'center',
  },
  main: {
    flex: 1,
    margin: 8,
    gap: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 4,
    textShadowRadius: 4,
    textShadowOffset: {
      height: 2,
      width: 2,
    },
  },
  headingContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  winnerTxt: {
    textAlign: 'center',
    fontSize: 24,
  },
  boardBox: {
    gap: 8,
  },
});
