import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import EntoTcon from 'react-native-vector-icons/Entypo';
import React, {useEffect, useRef, useState} from 'react';
import Cell from './components/Cell';

const App = () => {
  const [boardElements, setBoardElements] = useState(
    new Array(9).fill('empty', 0, 9),
  );
  const [isCross, setIsCross] = useState(true);
  const [winner, setWinner] = useState('');
  const [winningCombination, setWinningCombination] = useState<number[]>([]);
  const isMounted = useRef(false);

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
        setWinner(boardElements[a]);
        setWinningCombination(combination);
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
    setWinningCombination([]);
  };

  useEffect(() => {
    if (isMounted.current) checkIsGameOver();
    else isMounted.current = true;
  }, [boardElements]);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.headingContainer}>
        <EntoTcon size={32} color="#000" name="cross" />
        <Text style={styles.heading}>Tic Tac To</Text>
        <EntoTcon size={32} color="#000" name="circle" />
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{backgroundColor: '#000', padding: 8}}>
          <FlatList
            numColumns={3}
            data={boardElements}
            keyExtractor={(item, index) => index as unknown as string}
            contentContainerStyle={styles.boardBox}
            columnWrapperStyle={styles.boardBox}
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

      <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
        <Text style={styles.resetTxt}>{winner ? 'Re-match' : 'Reset'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 8,
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
  resetButton: {
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 8,
  },
  resetTxt: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  winnerTxt: {
    textAlign: 'center',
    fontSize: 24,
  },
  boardBox: {
    gap: 8,
  },
});
