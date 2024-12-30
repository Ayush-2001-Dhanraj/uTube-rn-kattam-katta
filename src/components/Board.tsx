import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import Cell from './Cell';
import {BoardElement} from '../constants';

interface BoardInterface {
  boardElements: BoardElement[];
  winner: string;
  onPressCell: (index: number) => void;
  winningCombination: number[];
}

const Board = ({
  boardElements,
  winner,
  onPressCell,
  winningCombination,
}: BoardInterface) => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={{backgroundColor: '#000', padding: 8}}>
        <FlatList
          numColumns={3}
          data={boardElements}
          keyExtractor={(_, index) => index as unknown as string}
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
                  onPressCell(index);
                }}
                disabled={!!winner}
                fillColor={fillColor}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default Board;

const styles = StyleSheet.create({
  boardBox: {
    gap: 8,
  },
});
