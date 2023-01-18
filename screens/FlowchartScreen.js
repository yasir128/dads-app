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
} from 'react-native';

import useState from 'react-usestateref';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Clipboard from '@react-native-clipboard/clipboard';

import { useGetFlowcharts } from '../hooks/useGetFlowcharts'


const SCROLL_X_OFFSET = 380

const SCROLLVIEW_Y_ENABLED = false
const SCROLLVIEW_X_ENABLED = true


const SelectedNodeDetail = ({ name, link, postId, topic }) => (
  <View style={selectedNodeDetailStyles.container}>
    <View style={selectedNodeDetailStyles.optionsContainer}>
        <TouchableOpacity
        onPress={() => Clipboard.setString(name)}
        style={selectedNodeDetailStyles.copyIconContainer}><Icon name="copy" size={20} color="#677c96"/></TouchableOpacity>
        {(link || postId) && <TouchableOpacity
          onPress={() => {
            if (link) Linking.openURL(link)
            else navigation.navigate('Post', {postId: postId, selectedTopic: topic})
          }}
          style={selectedNodeDetailStyles.linkIconContainer}><Icon name="external-link-alt" color="#679682" size={20}/></TouchableOpacity>}
    </View>
    <Text style={selectedNodeDetailStyles.selectedNodeText}>{name}</Text>
  </View>
)

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
      height: 130,
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
  },
  name: {
    fontSize: 20,
    textAlign: 'center',
    color: '#969696',

  },

  nameContainer: {
    margin: 10,
    width: 300,
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

  }, [flowchartsLoading])


  const scrollToTop = () => {
    setOffset({x: SCROLL_X_OFFSET, y: 0})
    setSelectedNode(flowcharts[0].flowchart)
    scrollHorRef.scrollTo({x: SCROLL_X_OFFSET})
    scrollVerRef.scrollTo({y: 0})
  }

  const scrollToNo = () => {

    console.log(selectedNodeRef)

    if (!selectedNodeRef.current) return

    console.log(offsetRef)

    setOffset(p => ({ y: p.y + 680, x: selectedNodeRef.current.yes ? ( p.x - (SCROLL_X_OFFSET * 0.4) ) : p.x }))

    console.log(offsetRef)

    scrollVerRef.scrollTo({y:  offsetRef.current.y, })
    scrollHorRef.scrollTo({x: offsetRef.current.x})

    setSelectedNode(selectedNode.no || selectedNode)

  }
  const scrollToYes = () => {

    console.log("\nselected node\n", selectedNodeRef.current)

    if (!selectedNodeRef.current) return

    console.log("\nShould go right",  selectedNodeRef.current.no ? "true" : "false")

    setOffset(p => ({ y: (p.y + 680), x: selectedNodeRef.current.no ? ( p.x + (SCROLL_X_OFFSET * 0.4)  ) : p.x }))

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
                    else navigation.navigate('Post', {postId: postId, selectedTopic: topic})
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


    {  // Jammy fix to issue of scrollToYes/No not seeing selectedNode has been set by calling scrollView on the first click to anywhere on screen
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
    marginTop: 100,
  },
});
