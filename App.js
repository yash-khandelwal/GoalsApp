import { useState } from 'react';
import { StyleSheet, View, FlatList, Button, StatusBar } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [modelIsVisible, setModelIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModelIsVisible(true);
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    setModelIsVisible(false);
  }

  function cancelGoalHandler(enteredGoalText) {
    setModelIsVisible(false);
  }

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => currentCourseGoals.filter((goal) => goal.id !== id))
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button 
          title='Add New Goal' 
          color="#a065ec" 
          onPress={startAddGoalHandler}
        />
        <GoalInput onAddGoal={addGoalHandler} visible={modelIsVisible} onCancelGoal={cancelGoalHandler}/>
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return <GoalItem text={itemData.item.text} id={itemData.item.id} onDeleteItem={deleteGoalHandler}/>;
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
