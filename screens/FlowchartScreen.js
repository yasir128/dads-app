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

const flowchartData =
{
  name: 'Are you already separated?',
  no: false,
  yes: {
    name: 'Are you able to mutually agree on everything?',
    yes: {name: 'Once the legal process has ran it\'s course you will need to agree the following:\nMake a parenting plan\nAgree finance\n Agree where children live/access/visits/time', yes: false, no: false},
    no: {
          name: 'First step is mediation, necessary in most cases before further steps are taken. Usually takes place over a period of time with many visits.',
          no: false,
          yes: {
            name: 'Did mediation work?',
            yes: false,
            no: {
              name: 'Has your partner accused you of abusive behaviour, or are social services involved',
              no: false,
              yes: {
                name:'You will need legal representation. A number of options are listed that you may find very helpful. You can get free initial consultations but you must prepare your questions first to make the most of it. The citizens advice bureau is also  a good source of help in the first instance.',
                no: false,
                yes: {
                  name: 'The legal process will run its course until you are both able to agree an outcome, or one is imposed upon you.',
                  no: false,
                  yes: {
                    name: 'Once the legal process has ran it\'s course you will need to agree the following:\nMake a parenting plan\nAgree finance\n Agree where children live/access/visits/time',
                    yes: false, no: false
                  },
                },
              },
            },
          },
      }
  }
}


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
    position: 'relative',
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


  useEffect(() => {

    setOffset({x: 200, y: 0})

    if (scrollHorRef) scrollHorRef.scrollTo({x: offsetRef.current.x, animated: true})
    if (scrollVerRef) scrollVerRef.scrollTo({animated: true})

    if (flowcharts) setSelectedNode(flowcharts[0].flowchart)

  }, [flowchartsLoading])


  const scrollToTop = () => {
    setOffset({x: 200, y: 0})
    setSelectedNode(flowcharts[0].flowchart)
    scrollHorRef.scrollTo({x: 200})
    scrollVerRef.scrollTo({y: 0})
  }

  const scrollToNo = () => {

    console.log(selectedNodeRef)

    if (!selectedNodeRef.current) return

    console.log(offsetRef)

    setOffset(p => ({ y: p.y + 550, x: selectedNodeRef.current.yes ? ( p.x - 200 ) : p.x }))

    console.log(offsetRef)

    scrollVerRef.scrollTo({y:  offsetRef.current.y, })
    scrollHorRef.scrollTo({x: offsetRef.current.x})

    setSelectedNode(selectedNode.no || selectedNode)

  }
  const scrollToYes = () => {
    if (!selectedNodeRef.current) return


    setOffset(p => ({ y: (p.y + 550), x: selectedNodeRef.current.no ? ( p.x + 150  ) : p.x }))

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
          <Text style={flowchartNodeStyles.name}>{name}</Text>

          <View style={flowchartNodeStyles.yesNoButtonContainer}>
            <TouchableOpacity style={[flowchartNodeStyles.yesNoButton, {backgroundColor: '#f2c9c9', opacity: no ? 1 : 0.5}]} onPress={() => no ? scrollToNo() : scrollToTop()}>
              <Text style={flowchartStyles.noButtonText}>{no ? "No" : "Back to top"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[flowchartNodeStyles.yesNoButton, {backgroundColor: '#b6d8c4', opacity: yes ? 1 : 0.5}]} onPress={() => yes ? scrollToYes() : scrollToTop()}>
              <Text style={flowchartStyles.yesButtonText}>{yes ? 'Yes' : "Back to top"}</Text>
            </TouchableOpacity>
          </View>

        </View>
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
  }



  return (
    <SafeAreaView style={flowchartStyles.container}>


    <View style={flowchartStyles.flowchartTitleContainer}>
      {flowcharts && <Text style={flowchartStyles.flowchartTitleText}>{flowcharts[0].title}</Text>}
    </View>

    <View style={flowchartStyles.flowchartContainer}>
      <ScrollView horizontal ref={r => setScrollHorRef(r)} >
          <ScrollView ref={r => setScrollVerRef(r)} >
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
