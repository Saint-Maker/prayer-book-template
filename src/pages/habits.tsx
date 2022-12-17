import {Box, Button, ButtonGroup, Flex, IconButton, Input, Wrap} from '@chakra-ui/react';
import {useRef, useState} from 'react';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {BsPencil} from 'react-icons/bs';
import Header from '../components/Header';
import Layout from '../components/Layout';

type Habit = {
  name: string
  days: boolean[]
  editing: boolean
}

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function Habits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const addInputRef = useRef<HTMLInputElement | null>(null);
  const editNameInputRef = useRef<HTMLInputElement | null>(null);
  const addHabit = () => {
    if (addInputRef?.current == undefined) return;
    const newHabit = {
      name: addInputRef.current.value,
      days: [false, false, false, false, false, false, false],
      editing: false,
    };
    if (newHabit.name.length === 0) return;
    setHabits((state: Habit[]) => [...state, newHabit]);
    addInputRef.current.value = '';
  };
  const deleteHabit = (deletedName: string) => {
    const updatedHabits = habits.filter((habit) => habit.name !== deletedName);
    setHabits(updatedHabits);
  };
  const updateLogic = (modifyHabit: (habit: Habit) => void) => {
    const updatedHabits = habits.map((habit) => {
      modifyHabit(habit);
      return habit;
    });
    setHabits(updatedHabits);
  };
  const updateHabit = (oldHabitName: string, newHabitName: string) => {
    if (newHabitName.length === 0) {
      toggleEditing(oldHabitName);
      return;
    }
    updateLogic((habit) => {
      if (habit.name === oldHabitName) {
        habit.name = newHabitName;
        habit.editing = false;
      }
    });
  };
  const toggleHabitForDay = (habitName: string, dayIndex: number) => {
    updateLogic((habit) => {
      if (habit.name === habitName) {
        habit.days[dayIndex] = !habit.days[dayIndex];
      }
    });
  };
  const toggleEditing = (habitName: string) => {
    updateLogic((habit) => {
      habit.editing = habit.name === habitName ? !habit.editing : false;
    });
  };

  return (
    <Layout>
      <Header title='Habits'>
        <Flex direction='row' pt='2'>
          <Input placeholder='Add a new habit' ref={addInputRef} />
          <IconButton
            ml='2'
            onClick={addHabit}
            aria-label="Add prayer"
            icon={<AiOutlinePlusCircle/>} />
        </Flex>
        {habits.map(({name, days, editing}, index) => (
          <Box key={`${name}-${index}`} pt='2'>
            <Box borderWidth='1px' borderRadius='lg' overflow='hidden' p='2'>
              <Flex direction='column' alignItems='center'>
                <Box>
                  <Flex direction='row' justifyContent='space-between' pb='2'>
                    <Box
                      fontWeight='semibold'
                      as='h4'
                      lineHeight='tight'
                      noOfLines={1}
                    >
                      {editing ? <Input type='text' placeholder='Edit habits current name' ref={editNameInputRef} /> : name}
                    </Box>
                    <IconButton
                      colorScheme={editing ? 'green' : 'gray'}
                      onClick={() => toggleEditing(name)}
                      aria-label="Add prayer"
                      icon={<BsPencil/>}/>
                  </Flex>
                  <Wrap spacing={2}>
                    {weekdays.map((value, dayIndex) => (
                    // TODO: figure out how to bring the logic from the colorScheme into a function without breaking the typing from chakra
                      <IconButton colorScheme={days[dayIndex] ? 'green' : !days[dayIndex] && new Date().getDay() === dayIndex ? 'gray' : 'red'} key={`${name}-days-${dayIndex}`} onClick={() => toggleHabitForDay(name, dayIndex)} variant={days[dayIndex] ? 'solid' : 'outline'} aria-label='Add to friends' icon={<p>{value}</p>} />
                    ))}
                  </Wrap>
                  {editing &&
                <ButtonGroup pt='2'>
                  <Button onClick={() => updateHabit(name, editNameInputRef.current !== null ? editNameInputRef.current.value : name)} colorScheme='green' variant='outline'>Update</Button>
                  <Button onClick={() => deleteHabit(name)} colorScheme='red' variant='outline'>Delete</Button>
                </ButtonGroup>
                  }
                </Box>
              </Flex>
            </Box>
          </Box>
        ))}
      </Header>
    </Layout>
  );
}

export default Habits;
