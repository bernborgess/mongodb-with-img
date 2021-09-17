// ! Isso é inútil né?

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PacienteService from '../services/paciente.service';
import {Paciente} from '../models/paciente.model';
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.findAllPaciente();
  }

  state = {
    data: [],
    value: null,
    onChangeText: null,
    dataId: null,
    dataInsert: null,
  };

  //acionado quando o componente e montado
  componentDidMount() {
    this.findAllPaciente();
  }

  //escuta atualizações na lista
  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      this.findAllPaciente();
    }
  }

  deletePaciente = (id) => {
    this.findPacienteById(id);
    if (this.state.dataId != null || this.state.dataId != undefined) {
      PacienteService.deleteById(id);
      alert('Paciente excluido com sucesso.');
    }
  };

  insertPaciente = (item) => {
    let file = new Paciente();
    file.nome = item;

    const insertId = PacienteService.addData(file);
    if (insertId == null || insertId == undefined) {
      alert('Não foi possivel inserir o novo paciente.');
    }
  };

  findAllPaciente = () => {
    PacienteService.findAll().then((response) => {
      this.setState({
        data: response._array,
        isLoading: false,
      });
    }),
      (error) => {
        console.log(error);
      };
  };
  findPacienteById = (id) => {
    PacienteService.findById(id).then((response) => {
      if (
        response._array.length > 0 &&
        response != null &&
        response != undefined
      ) {
        this.setState({
          dataId: response._array[0],
        });
      } else {
        alert('ID não encontrado');
      }
    }),
      (error) => {
        console.log(error);
      };
  };
  render() {
    //extrai as propriedades entre chaves
    const {data, value, dataInsert} = this.state;

    const animalList = data.map((item, key) => {
      return (
        <>
          <Text>
            id:{item.id} nome:{item.nome}
          </Text>
        </>
      );
    });

    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, paddingBottom: 20}}>Lista de Animais</Text>
        <TextInput
          placeholder='digite o id'
          style={styles.textInput}
          onChangeText={(text) => {
            this.setState({value: text});
          }}
          value={value}
        />
        <View style={styles.containerTouch}>
          <TouchableOpacity
            onPress={() => {
              value == null
                ? alert('O campo de id não pode ser vazio')
                : this.deleteAnimal(value);
            }}
            style={{alignItems: 'center', backgroundColor: 'green'}}>
            <Icon name='md-remove' size={30} color='white' />
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder='digite o nome do novo animal'
          style={styles.textInput}
          onChangeText={(textAdd) => {
            this.setState({dataInsert: textAdd});
          }}
          value={dataInsert}
        />

        <View style={styles.containerTouch}>
          <TouchableOpacity
            onPress={() =>
              dataInsert == null
                ? alert('O campo de nome não pode ser vazio')
                : this.insertAnimal(dataInsert)
            }
            style={{alignItems: 'center', backgroundColor: 'green'}}>
            <Icon name='md-add' size={30} color='white' />
          </TouchableOpacity>
        </View>
        {animalList}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInput: {
    alignItems: 'center',
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  containerTouch: {
    width: 200,
    padding: 10,
  },
});
