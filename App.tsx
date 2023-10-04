import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

// ADDED
interface IButton {
  value: string;
  style?: 'wide' | 'orange' | 'light-grey';
  onPress?: () => void;
}

const btnMargin = 4;

const screen = Dimensions.get('window');

// rows with 4 buttons and a margin on either side
const buttonWidth = screen.width / 4 - btnMargin * 2;

const Row = React.memo(({children}: {children: any}) => {
  return <View style={styles.row}>{children}</View>;
});

const Button = React.memo(({value, style, onPress}: IButton) => {
  const btnStyles: any[] = [styles.btn];
  const txtStyles: any[] = [styles.btnText];

  if (style === 'light-grey') {
    btnStyles.push(styles.btnLightGrey);
    txtStyles.push(styles.btnTextLightGrey);
  } else if (style === 'orange') {
    btnStyles.push(styles.btnOrange);
  } else if (style === 'wide') {
    btnStyles.push(styles.wide);
  }
  return (
    <TouchableOpacity style={btnStyles} onPress={onPress}>
      <Text style={txtStyles}>{value}</Text>
    </TouchableOpacity>
  );
});

function App(): JSX.Element {
  const backgroundStyle = {
    backgroundColor: '#F3F3F3',
  };

  const [currentValue, setValue] = useState('');
  const [currentOperator, setOperator] = useState('');
  const [concatenate, setContatenate] = useState(false);
  const [prevValue, setPrevValue] = useState('');
  const changeInput = (text: string) => {
    if (concatenate) {
      setValue(currentValue + text);
    } else {
      setPrevValue(currentValue);
      setValue(text);
      setContatenate(true);
    }
  };

  const changeOperator = (operator: string) => {
    if (prevValue && currentValue && currentOperator && concatenate) {
      evaluate();
    } else {
      setPrevValue(currentValue);
    }
    setContatenate(false);
    setOperator(operator);
  };

  const evaluate = () => {
    if (prevValue && currentValue && currentOperator) {
      switch (currentOperator) {
        case '*':
          var res = parseFloat(prevValue) * parseFloat(currentValue);
          setPrevValue('');
          setValue(res.toString());
          break;
        case '/':
          var res = parseFloat(prevValue) / parseFloat(currentValue);
          setPrevValue('');
          setValue(res.toString());
          break;
        case '+':
          var res = parseFloat(prevValue) + parseFloat(currentValue);
          setPrevValue('');
          setValue(res.toString());
          break;
        case '-':
          var res = parseFloat(prevValue) - parseFloat(currentValue);
          setPrevValue('');
          setValue(res.toString());
          break;
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text style={styles.computedValue}>{currentValue || '0'}</Text>
      <Row>
        <Button
          value="AC"
          style="light-grey"
          // onPress={() => changeOperator('AC')}
        />
        <Button
          value="+/-"
          style="light-grey"
          // onPress={() => changeOperator('AC')}
        />
        <Button
          value="%"
          style="light-grey"
          // onPress={() => changeOperator('AC')}
        />
        <Button value="/" style="orange" onPress={() => changeOperator('/')} />
      </Row>
      <Row>
        <Button value="7" onPress={() => changeInput('7')} />
        <Button value="8" onPress={() => changeInput('8')} />
        <Button value="9" onPress={() => changeInput('9')} />
        <Button value="X" style="orange" onPress={() => changeOperator('*')} />
      </Row>
      <Row>
        <Button value="4" onPress={() => changeInput('4')} />
        <Button value="5" onPress={() => changeInput('5')} />
        <Button value="6" onPress={() => changeInput('6')} />
        <Button value="-" style="orange" onPress={() => changeOperator('-')} />
      </Row>
      <Row>
        <Button value="1" onPress={() => changeInput('1')} />
        <Button value="2" onPress={() => changeInput('2')} />
        <Button value="3" onPress={() => changeInput('3')} />
        <Button value="+" style="orange" onPress={() => changeOperator('+')} />
      </Row>
      <Row>
        <Button value="0" onPress={() => changeInput('0')} style="wide" />
        <Button value="." onPress={() => changeInput('.')} />
        <Button value="=" style="orange" onPress={evaluate} />
      </Row>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
    justifyContent: 'flex-end',
  },
  computedValue: {
    color: '#ffffff',
    fontSize: 80,
    textAlign: 'right',
    marginRight: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  btnText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '500',
  },
  btn: {
    backgroundColor: '#222222',
    flex: 1,
    alignItems: 'center',
    margin: btnMargin,
    justifyContent: 'center',
    borderRadius: 100,
    height: buttonWidth,
  },
  btnLightGrey: {
    backgroundColor: '#A5A5A5',
  },
  btnTextLightGrey: {
    color: '#060606',
  },
  btnOrange: {
    backgroundColor: '#FF9F06',
  },
  wide: {
    flex: 0,
    width: buttonWidth * 2 + btnMargin * 2,
  },
});

export default App;
