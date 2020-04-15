import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin, userRegistration, updateState,userPatrol } from '../../actions/user';

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  ScrollView
} from 'react-native';
import { CheckBox, Button, ListItem,Header } from 'react-native-elements';
import Modal from 'react-native-modal';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Location from 'expo-location';
const LOCATION_TASK_NAME = 'background-location-task';

class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      petrolGps: false,
      petrolQRCode: false,
      petrolNfc: false,
      isModalVisible: false,
      hasCameraPermission: null,
      scanned: false,
      tagType:null,
      data:null,
    };
  }
  async componentDidMount() {
    // const { status } = await Location.requestPermissionsAsync();
    // console.log("Status",status)
    // if (status === 'granted') {
    //   debugger
    //   await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    //     accuracy: Location.Accuracy.Balanced,
    //   });
    // }

    console.log('props', this.props.userState.patrol)
  }
  



  render() {
    const { userDetails, responseTriggerred, successMessage, failureMessage, login, petrolGps, petrolQRCode, petrolNfc, history, calendericon, clockicon } = this.props.userState;
    console.log('Histroy',successMessage)

    return (
      <View style={styles.container}>
      <Header
            leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer()}}
            centerComponent={{ text: 'Check In/Out', style: { color: '#fff' } }}
            rightComponent={{ icon: 'settings', color: '#fff',onPress: () => this.props.navigation.navigate('SettingScreen')}}
        />
        <ScrollView>
        <View style={{ padding: 10, justifyContent: 'center', alignItems: 'stretch', backgroundColor: '#f4f0f0d6' }}>
          {
            history.map((item, i) => (
              <ListItem
                key={i}
                title={item.date}
                leftIcon={{ name: calendericon }}
                rightIcon={{ name: clockicon }}
                rightTitle={item.time}
                rightSubtitle={item.subtitle}
                bottomDivider
              />
            ))
          }
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

//export default Patrol;
History.propTypes = {
  userDetails: PropTypes.object,
}

const mapStateToProps = state => ({
  userState: state.userState
});

const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators({ userLogin, userRegistration, updateState,userPatrol }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(History);