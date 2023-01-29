import React, { useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  Dimensions
} from 'react-native';

import useState from 'react-usestateref';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Clipboard from '@react-native-clipboard/clipboard';

import { useGetFlowcharts } from '../hooks/useGetFlowcharts'

const PADDING = 20

const SCROLL_X_OFFSET = Dimensions.get('window').width + 286
const SCROLL_Y_OFFSET = 855

const SCROLLVIEW_Y_ENABLED = false
const SCROLLVIEW_X_ENABLED = true


const SelectedNodeDetail = ({ name, link, postId, selectedTopic }) => (
  <View style={selectedNodeDetailStyles.container}>
    <View style={selectedNodeDetailStyles.optionsContainer}>
        <TouchableOpacity
        onPress={() => Clipboard.setString(name)}
        style={selectedNodeDetailStyles.copyIconContainer}><Icon name="copy" size={20} color="#677c96"/></TouchableOpacity>
        {(link || postId) && <TouchableOpacity
          onPress={() => {
            if (link) Linking.openURL(link)
            else navigation.navigate('Post', {postId: postId, selectedTopic: selectedTopic })
          }}
          style={selectedNodeDetailStyles.linkIconContainer}><Icon name="external-link-alt" color="#679682" size={20}/></TouchableOpacity>}
    </View>
    <Text style={selectedNodeDetailStyles.selectedNodeText}>{name}</Text>
  </View>
)

const selectedNodeDetailStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    // SHADOW
    shadowColor: '#adadad',
    elevation: 3,
    shadowOffset: { width: -3, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 1,
    borderRadius: 10,
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
    width: 290,
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
      width: 30,
      height: 30,
      padding: 3,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
    },

    backToTopText: {
      color: 'white',
    },

    nameScrollContainer: {
      height: 300,
    },


    yesNoButtonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 30,

      // borderColor: 'black',
      // borderWidth: 1,
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
      shadowRadius: 2,
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
    zIndex: 50,
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  name: {
    fontSize: 20,
    textAlign: 'center',
    color: '#969696',

  },

  nameContainer: {
    margin: 10,
    width: Dimensions.get('window').width - PADDING,
    borderTopWidth: 8,
    backgroundColor: '#ffffff',
    borderRadius: 7,
    padding: 25,
    paddingLeft: 30,
    paddingRight: 30,
    zIndex: 50,
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


  const [selectedNode, setSelectedNode, selectedNodeRef] = useState()
  const [scrollHorRef, setScrollHorRef] = useState()
  const [scrollVerRef, setScrollVerRef] = useState()
  const [offset, setOffset, offsetRef] = useState()

  const [flowchartStart, setFlowchartStart] = useState(false)


  useEffect(() => {

    setOffset({x: SCROLL_X_OFFSET, y: 0})

    if (scrollHorRef) scrollHorRef.scrollTo({x: SCROLL_X_OFFSET, animated: true})
    if (scrollVerRef) scrollVerRef.scrollTo({animated: true})

    if (flowcharts) setSelectedNode(flowcharts[0].flowchart)

  }, [flowcharts])


  const scrollToTop = () => {
    setOffset({x: SCROLL_X_OFFSET, y: 0})
    setSelectedNode(flowcharts[0].flowchart)
    scrollHorRef.scrollTo({x: SCROLL_X_OFFSET})
    scrollVerRef.scrollTo({y: 0})
  }

  const scrollToNo = () => {


    if (!selectedNodeRef.current) return

    let xOff = selectedNodeRef.current.yes ? ( offset.x - (SCROLL_X_OFFSET * 0.31) ) : offset.x

    setOffset(p => ({ y: p.y + SCROLL_Y_OFFSET, x: selectedNodeRef.current.noXOff ? p.x - selectedNodeRef.current.noXOff :  xOff }))

    scrollVerRef.scrollTo({y:  offsetRef.current.y, })
    scrollHorRef.scrollTo({x: offsetRef.current.x})

    setSelectedNode(selectedNode.no || selectedNode)

  }
  const scrollToYes = () => {

    if (!selectedNodeRef.current) return

    let xOff = selectedNodeRef.current.no ? ( offset.x + (SCROLL_X_OFFSET * 0.3)  ) : offset.x

    setOffset(p => ({ y: (p.y + SCROLL_Y_OFFSET), x: selectedNodeRef.current.yesXOff ? selectedNodeRef.current.yesXOff + p.x : xOff }))

    scrollVerRef.scrollTo({y: offsetRef.current.y,})
    scrollHorRef.scrollTo({x:  offsetRef.current.x})


    setSelectedNode(selectedNode.yes || selectedNode)

  }


  const OldFlowchartNode = ({name, link, postId, topic, yes, no, color }) => (
    <View style={flowchartNodeStyles.container}>
      <TouchableOpacity onPress={() => setSelectedNode({name: name, link: link, postId: postId, topic: topic})}>
        <Text style={[ flowchartNodeStyles.name, { borderTopColor: color || '#6072e5' } ]}>{name}</Text>
      </TouchableOpacity>
      <View style={flowchartNodeStyles.optionsContainer}>
        { no ? <View style={flowchartNodeStyles.noTextContainer}><Text style={{color: '#b0b0b2'}}>no</Text></View> : <Text style={flowchartNodeStyles.stopNode}>end</Text>}
        { yes ? <View style={flowchartNodeStyles.yesTextContainer}><Text style={{color: '#b0b0b2'}}>yes</Text></View> : <Text style={flowchartNodeStyles.stopNode}>end</Text>  }
      </View>
      <View style={flowchartNodeStyles.nodesContainer}>
        <View style={flowchartNodeStyles.yesNodeContainer}>{ yes && <FlowchartNode {...yes} /> }</View>
        <View style={flowchartNodeStyles.noNodeContainer}>{ no && <FlowchartNode {...no} /> }</View>
      </View>
    </View>
  )

  const FlowchartNode = ({name, link, postId, topic, yes, no, color}) => {
    return (
      <View style={flowchartNodeStyles.container}>

        <View style={[ flowchartNodeStyles.nameContainer, { borderTopColor: color || '#6072e5' } ]}>
          <View style={selectedNodeDetailStyles.optionsContainer}>
              {(link || postId) &&
                <TouchableOpacity
                  style={selectedNodeDetailStyles.linkIconContainer}
                  onPress={() => {
                    if (link) Linking.openURL(link)
                    else navigation.navigate('Post', {postId: postId, selectedTopic: topic })
                  }}>
                    <Icon name="external-link-alt" color="#679682" size={20}/>
                </TouchableOpacity>
              }
              <TouchableOpacity  onPress={() => Clipboard.setString(name)} style={selectedNodeDetailStyles.copyIconContainer}>
                <Icon name="copy" size={20} color="#677c96"/>
              </TouchableOpacity>
          </View>
          <ScrollView style={flowchartNodeStyles.nameScrollContainer} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}><Text style={flowchartNodeStyles.name}>{name}</Text></ScrollView>

          <View style={flowchartNodeStyles.yesNoButtonContainer}>
            <TouchableOpacity disabled={!no} style={[flowchartNodeStyles.yesNoButton, {backgroundColor: '#f2c9c9', opacity: no ? 1 : 0.3}]} onPress={() => scrollToNo()}>
              <Text style={flowchartStyles.noButtonText}>{"No"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={scrollToTop} style={flowchartNodeStyles.backToTopContainer}><Icon name="arrow-up" color="white" size={10} /></TouchableOpacity>

            <TouchableOpacity disabled={!yes} style={[flowchartNodeStyles.yesNoButton, {backgroundColor: '#b6d8c4', opacity: yes ? 1 : 0.3}]} onPress={() => scrollToYes()}>
              <Text style={flowchartStyles.yesButtonText}>{'Yes'}</Text>
            </TouchableOpacity>


          </View>

        </View>
        <View style={flowchartNodeStyles.optionsContainer}>
          { no ? <View style={flowchartNodeStyles.noTextContainer}><Text style={{color: '#b0b0b2'}}>no</Text></View> : <Text style={flowchartNodeStyles.stopNode}>end</Text>}
          { yes ? <View style={flowchartNodeStyles.yesTextContainer}><Text style={{color: '#b0b0b2'}}>yes</Text></View> : <Text style={flowchartNodeStyles.stopNode}>end</Text>  }
        </View>
        <View style={flowchartNodeStyles.nodesContainer}>
          <View style={flowchartNodeStyles.noNodeContainer}>{ no && <FlowchartNode {...no} /> }</View>
          <View style={flowchartNodeStyles.yesNodeContainer}>{ yes && <FlowchartNode {...yes} /> }</View>
        </View>
      </View>
    )
  }



  return (
    <SafeAreaView style={flowchartStyles.container}>


    <View style={flowchartStyles.flowchartTitleContainer}>
      {flowcharts && <Text style={flowchartStyles.flowchartTitleText}>{flowcharts[0].title}</Text>}
    </View>


    {  // Jammy fix to issue of scrollToYes/No not seeing selectedNode has been set by calling scrollToTop on the first click to anywhere on screen
      !flowchartStart && (
      <TouchableOpacity style={flowchartStyles.flowchartStartContainer} onPress={() => {
          scrollToTop();
          setFlowchartStart(true);
        }}>
        <Text style={flowchartStyles.flowchartStartText}>Start Flowchart</Text>
      </TouchableOpacity>)
    }

    <View style={flowchartStyles.flowchartContainer}>
      <ScrollView horizontal ref={r => setScrollHorRef(r)} scrollEnabled={SCROLLVIEW_X_ENABLED}>
          <ScrollView ref={r => setScrollVerRef(r)} scrollEnabled={SCROLLVIEW_Y_ENABLED}>
            <View style={{ transform: [{ scale: 1}] }}>
            {flowcharts && <FlowchartNode {...flowcharts[0].flowchart} />}
            {flowchartsLoading && <ActivityIndicator size={50} color="#16247f" /> }
            {flowchartsError && <Text style={flowchartStyles.errorText}>{flowchartError}</Text>}
            </View>
          </ScrollView>
        </ScrollView>
    </View>
    </SafeAreaView>
  );
}
//setOffset(p => ({...p, x: event.nativeEvent.contentOffset.x})))
// ({...p, y: event.nativeEvent.contentOffset.y})))

const flowchartStyles = StyleSheet.create({

  flowchartStartContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    backgroundColor: '#2c5b87',
    padding: 30,
    zIndex: 100,
    width: '100%',
    height: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
  flowchartStartText: {},

  container: {
    backgroundColor: '#f9f9f9',
    // margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
  flowchartTitleContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#bcbcbc',
    marginTop: 60,
  },
  flowchartTitleText: {
    fontSize: 25,
    padding: 10,
    textAlign: 'center',
    color: '#bcbcbc',
  },
  selectedNodeContainer: {
    marginTop: 40,
  },
  errorText: {
    color: '#872e2c',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flowchartContainer: {
    marginTop: 30,
    marginBottom: 100,
  },
});
