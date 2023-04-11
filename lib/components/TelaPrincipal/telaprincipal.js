import {
    Text,
    View,
    StyleSheet,
    Image,
    SafeAreaView,
    Button,
  } from 'react-native';
  import React from 'react';
  
  const Separator = () => {
    return <View style={styles.Separator} />;
  };
  class TelaPrincipal extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('../../../assets/logo.png')}
          />
          <Text style={styles.paragraph}>SONHO DE VIAGEM!</Text>
          <SafeAreaView>
            <Button
              onPress={() => this.props.navigation.navigate('Login')}
              title="Login"
              color="#696969"
            />
            <Separator />
            <Button onPress={''} title="Ajuda" color="#696969" />
          </SafeAreaView>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf0f1',
      padding: 8,
      JustifyContent: 'space-betwen',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    logo: {
      width: 320,
      height: 400,
    },
    Separator: {
      marginVertical: 20,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });
  
  export default TelaPrincipal;