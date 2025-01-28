import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import Cell from '../Cell';
import EntoTcon from 'react-native-vector-icons/Entypo';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import {BoardElement, MODE} from '../../constants';

interface BoardInterface {
  boardElements: BoardElement[];
  winner: string;
  onPressCell: (index: number) => void;
  winningCombination: number[];
  isCross: boolean;
  disabled: boolean;
  currentMode: keyof typeof MODE;
}

const Board = ({
  boardElements,
  winner,
  onPressCell,
  winningCombination,
  isCross,
  disabled,
  currentMode,
}: BoardInterface) => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={{alignItems: 'center', padding: 8}}>
        {winningCombination.length ? (
          <AntIcon size={40} color="green" name="smile-circle" />
        ) : winner ? (
          <FA5Icon size={40} color="red" name="sad-cry" />
        ) : (
          <EntoTcon
            size={40}
            color="green"
            name={isCross ? 'cross' : 'circle'}
          />
        )}
      </View>
      <View style={{backgroundColor: '#000', padding: 8}}>
        <FlatList
          numColumns={3}
          data={boardElements}
          keyExtractor={(_, index) => index as unknown as string}
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
                  onPressCell(index);
                }}
                disabled={!!winner || disabled}
                fillColor={fillColor}
              />
            );
          }}
        />
      </View>
      <View style={{alignItems: 'center', padding: 8}}>
        {winner ? (
          <Text style={styles.infoTxt}>
            {currentMode == MODE.MULTI ? 'Round Completed' : 'Game Over'}
          </Text>
        ) : (
          <Text style={styles.infoTxt}>
            {currentMode.includes('BOT') && !isCross
              ? 'Bot is thinking...'
              : isCross
              ? `Cross's turn${currentMode.includes('BOT') ? ' (You)' : ''}`
              : "Circle's Turn"}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Board;
