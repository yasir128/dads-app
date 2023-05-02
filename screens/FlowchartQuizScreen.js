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
  Animated,
  Dimensions
} from 'react-native';

import {PanGestureHandler} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Clipboard from '@react-native-clipboard/clipboard';

import { useGetFlowcharts } from '../hooks/useGetFlowcharts'


const YES_COLOR = '#b6d8c4'
const NO_COLOR = '#f2c9c9'


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

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const goBack = () => {
    setSelectedNode(flowcharts[0].flowchart)
  }

  useEffect(() => {
    if (flowcharts) setSelectedNode(flowcharts[0].flowchart)
  }, [flowcharts])


  const translateX = new Animated.Value(0)
  const translateY = new Animated.Value(0)

  const handlePan = Animated.event(
    [{ nativeEvent: { translationX: translateX } } ], { useNativeDriver: true }
  )

  const swipeUpAnimation = Animated.timing(translateY, {
    toValue: -500,
    duration: 400,
    useNativeDriver:true
  })

  const resetY = Animated.timing(translateY,{
      toValue:0,
      duration:250,
      useNativeDriver:true
  })

  const resetX = Animated.timing(translateX,{
      toValue:0,
      duration:250,
      useNativeDriver:true
    })

    const swipeLeftAnimation = Animated.timing(translateX,{
      toValue: 600,
      duration: 400,
      useNativeDriver:true
    })

    const swipeRightAnimation = Animated.timing(translateX,{
      toValue: -600,
      duration: 400,
      useNativeDriver:true
  })


  const threshold = Dimensions.get('window').width / 3

  const handleSwipe = ({nativeEvent, yes, no}) => {
    //swiping right
    const {state} = nativeEvent
    if(state === 5) {
      if(nativeEvent.translationX < -threshold && yes) { // SWIPE RIGHT (YES)
        swipeRightAnimation.start(() => {
            resetX.start(() => setSelectedNode(yes))
        })
      }

      //swiping left
      else if(nativeEvent.translationX > threshold && no) { // SWIPE LEFT (NO)
        swipeLeftAnimation.start(() => {
          resetX.start(() => setSelectedNode(no))
        })
      }

      else resetX.start()
    }

  }

  const FlowchartNode = ({name, link, postId, topic, yes, no, color}) => (
      <Animated.View style={[flowchartNodeStyles.container, {
        opacity: translateY.interpolate({
          inputRange: [-500, 0],
          outputRange: [-1, 1]
        })
      }]}>
          <PanGestureHandler onHandlerStateChange={(e) => handleSwipe({...e, yes, no})} onGestureEvent={handlePan}>
          <Animated.View style={
            [
              flowchartNodeStyles.nameContainer,
              {
                borderTopColor: color || '#6072e5',
                transform:[
                  { translateX: translateX },
                  { translateY: translateY },
                  { rotate: translateX.interpolate({
                    inputRange: [-Dimensions.get('window').width, 0, Dimensions.get('window').width],
                    outputRange: ['-50deg', '0deg', '50deg']
                  })}
                ],
                opacity: translateX.interpolate({
                  inputRange: [-Dimensions.get('window').width, 0, Dimensions.get('window').width],
                  outputRange: [-1, 1, -1]
                })
              }
            ]
          }>
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

            </Animated.View>
          </PanGestureHandler>
      </Animated.View>
  )



  const YesNoButtons = ({ yes, no }) => (
    <View style={flowchartNodeStyles.yesNoButtonContainer}>
      <AnimatedTouchable
      disabled={!no}
      style={[
        flowchartNodeStyles.yesNoButton,
        {
          backgroundColor: NO_COLOR,
          opacity: no ? 1 : 0.3,
          transform: [
            {
              scale: translateX.interpolate({
                inputRange: [-Dimensions.get('window').width, 0, Dimensions.get('window').width],
                outputRange: [1, 1, 1.5]
              })
            }
          ]
        }
      ]}
      onPress={() => swipeLeftAnimation.start(() => resetX.start(() => setSelectedNode(no)) ) }>
        <Text style={flowchartStyles.noButtonText}>{"No"}</Text>
      </AnimatedTouchable>

      <TouchableOpacity
      disabled={flowcharts[0].flowchart === selectedNode}
      onPress={() => swipeUpAnimation.start(() => resetY.start(() => goBack()))}
      style={[flowchartNodeStyles.backToTopContainer, {opacity: flowcharts[0].flowchart === selectedNode ? 0.5 : 1}]}>
        <Icon name="arrow-up" color="white" size={10} />
      </TouchableOpacity>

      <AnimatedTouchable
      disabled={!yes}
      style={[
        flowchartNodeStyles.yesNoButton,
        {
          backgroundColor: YES_COLOR,
          opacity: yes ? 1 : 0.3,
          transform: [
            {
              scale: translateX.interpolate({
                inputRange: [-Dimensions.get('window').width, 0, Dimensions.get('window').width],
                outputRange: [1.5, 1, 1]
              })
            }
          ]
        }
      ]}
      onPress={() => swipeRightAnimation.start(() => resetX.start(() => setSelectedNode(yes))) } >
        <Text style={flowchartStyles.yesButtonText}>{'Yes'}</Text>
      </AnimatedTouchable>
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
    marginTop: 0,
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
