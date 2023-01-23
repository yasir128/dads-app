import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Clipboard from '@react-native-clipboard/clipboard';

import { useGetFlowcharts } from '../hooks/useGetFlowcharts'

const selectedNodeDetailStyles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: '#ffffff',
    // SHADOW
    shadowColor: '#adadad',
    elevation: 3,
    shadowOffset: { width: -3, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 1,
    borderRadius: 10,
    padding: 15,
  },
  selectedNodeText: {
    fontSize: 16,
    color: '#505556',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 13,
    width: 250,
  },
  copyIconContainer: {

  },
  linkIconContainer: {
    marginRight: 17,
  },
})



const flowchartNodeStyles = StyleSheet.create({

    backToTopContainer: {
      alignSelf: 'center',
      backgroundColor: '#8fa8bf',
      padding: 10,
      borderRadius: 20,
    },

    backToTopText: {
      color: 'white',
    },

    nameScrollContainer: {
      // height: '100%',
    },


    yesNoButtonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 30,
      padding: 30,
      borderRadius: 15,
      backgroundColor: 'white',
      // SHADOW
      shadowColor: '#adadad',
      elevation: 2,
      shadowOffset: { width: -2, height: 2 },
      shadowOpacity: 0.7,
      shadowRadius: 1,
    },

    yesNoButton: {
      padding: 10,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 15,

      shadowColor: '#adadad',
      elevation: 3,
      shadowOffset: { width: -3, height: 4 },
      shadowOpacity: 0.7,
      shadowRadius: 1,
    },
    yesButtonText: {
      color: '#000000'
    },
    noButtonText: {
      color: '#000000'
    },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  name: {
    fontSize: 20,
    textAlign: 'center',
    color: '#969696',

  },

  nameContainer: {
    width: '90%',
    height: '90%',
    borderTopWidth: 8,
    paddingTop: 25,
    backgroundColor: '#ffffff',
    borderRadius: 7,
    padding: 25,
    paddingLeft: 30,
    paddingRight: 30,
    // position: 'relative',
    // SHADOW
    shadowColor: '#adadad',
    elevation: 3,
    shadowOffset: { width: -3, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 1,
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    // position: 'relative',
    margin: 10,
    width: 300,
    justifyContent: 'space-between',
  },
  yesTextContainer: {
    // position: 'absolute',
    // right: 65,
    alignSelf: 'flex-end',
    borderLeftWidth: 1,
    borderLeftColor: '#b0b0b2',
    paddingLeft: 5,
    height: 350,
    justifyContent: 'center',
  },
  noTextContainer: {
    // position: 'absolute',
    // left: 60,
    alignSelf: 'flex-start',
    borderRightWidth: 1,
    borderRightColor: '#b0b0b2',
    paddingRight: 5,
    height: 350,
    justifyContent: 'center',
  },
  nodesContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
  },
  yesNodeContainer: {
    // display: 'flex',
    // flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  noNodeContainer: {
    alignSelf: 'flex-start',
  },
  stopNode: {},

})

export default function Flowchart({ navigation, route }) {


  const { flowcharts, flowchartsError, flowchartsLoading } = useGetFlowcharts({ reload: false })


  // const [selectedNode, setSelectedNode] = useState({name: flowchartsError ? 'Error Loading the flowchart' : 'Scroll to view the whole flowchart to better understand the divorce process. You can press a node to get more detail and read related posts.'})
  const [selectedNode, setSelectedNode] = useState()

  const goBack = () => {
    setSelectedNode(flowcharts[0].flowchart)
  }

  useEffect(() => {
    if (flowcharts) setSelectedNode(flowcharts[0].flowchart)
  }, [flowcharts])

  const FlowchartNode = ({name, link, postId, topic, yes, no, color}) => (
      <View style={flowchartNodeStyles.container}>
        <View style={[ flowchartNodeStyles.nameContainer, { borderTopColor: color || '#6072e5' } ]}>

          <View style={selectedNodeDetailStyles.optionsContainer}>
              {(link || postId) &&
                <TouchableOpacity
                  style={selectedNodeDetailStyles.linkIconContainer}
                  onPress={() => {
                    if (link) Linking.openURL(link)
                    else navigation.navigate('Post', {postId: postId, selectedTopic: topic})
                  }}>
                    <Icon name="external-link-alt" color="#679682" size={20}/>
                </TouchableOpacity>
              }
              <TouchableOpacity  onPress={() => Clipboard.setString(name)} style={selectedNodeDetailStyles.copyIconContainer}>
                <Icon name="copy" size={20} color="#677c96"/>
              </TouchableOpacity>
          </View>

          <ScrollView
            style={flowchartNodeStyles.nameScrollContainer}
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
              <Text style={flowchartNodeStyles.name}>{name}</Text>
          </ScrollView>

        </View>
      </View>
  )


  const YesNoButtons = ({ yes, no }) => (
    <View style={flowchartNodeStyles.yesNoButtonContainer}>
      <TouchableOpacity
      disabled={!no}
      style={[flowchartNodeStyles.yesNoButton, {backgroundColor: '#f2c9c9', opacity: no ? 1 : 0.3}]}
      onPress={() => setSelectedNode(no)}>
        <Text style={flowchartStyles.noButtonText}>{"No"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={() => goBack()}
      style={flowchartNodeStyles.backToTopContainer}>
        <Icon name="arrow-up" color="white" size={10} />
      </TouchableOpacity>

      <TouchableOpacity
      disabled={!yes}
      style={[flowchartNodeStyles.yesNoButton, {backgroundColor: '#b6d8c4', opacity: yes ? 1 : 0.3}]}
      onPress={() => setSelectedNode(yes)}>
        <Text style={flowchartStyles.yesButtonText}>{'Yes'}</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={flowchartStyles.container}>

    <View style={flowchartStyles.flowchartTitleContainer}>
      {flowcharts && <Text style={flowchartStyles.flowchartTitleText}>{flowcharts[0].title}</Text>}
    </View>

    <View style={flowchartStyles.flowchartContainer}>
          <View>
            {selectedNode && <FlowchartNode {...selectedNode} /> }
            {flowchartsLoading && <ActivityIndicator size={50} color="#16247f" /> }
            {flowchartsError && <Text style={flowchartStyles.errorText}>{flowchartError}</Text>}
          </View>
    </View>
    <View style={flowchartStyles.flowchartOptionsContainer}>{selectedNode && <YesNoButtons {...selectedNode} />}</View>
    </SafeAreaView>
  );
}

const flowchartStyles = StyleSheet.create({

  container: {
    marginTop: 40,
    backgroundColor: '#f9f9f9',
    // margin: 10,
    display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    height: '100%',
  },
  flowchartOptionsContainer: {
    position: 'absolute',
    bottom: 45,
    left: 18,
    width: '90%',
  },
  flowchartTitleContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#bcbcbc',
  },
  flowchartTitleText: {
    fontSize: 25,
    padding: 10,
    color: '#bcbcbc',
  },
  selectedNodeContainer: {
  },

  errorText: {
    color: '#872e2c',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flowchartContainer: {
  },
});
