import {Box, Button, ButtonGroup, Flex, IconButton, Input, Wrap} from '@chakra-ui/react';
import {nanoid} from 'nanoid';
import {ChangeEventHandler, useEffect, useRef, useState} from 'react';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {BsPencil} from 'react-icons/bs';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/Header';
import Layout from '../components/Layout';
import {addHabit, deleteHabit, editHabit, editHabits, getHabits} from '../redux/slice/habitSlice';
import {AppDispatch, selectHabits} from '../redux/store';

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const defaultWeekStatus = [false, false, false, false, false, false, false];

function Habits() {
  const [updatedName, setUpdatedName] = useState('');
  const handleNameUpdate: ChangeEventHandler<HTMLInputElement> = ({currentTarget: {value}}) => setUpdatedName(value);
  const addInputRef = useRef<HTMLInputElement | null>(null);
  const editNameInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const habits = useSelector(selectHabits);

  useEffect(() => {
    dispatch(getHabits());
  }, []);

  const addHabitHandler = () => {
    if (addInputRef?.current == undefined || addInputRef.current.value.length === 0) return;
    dispatch(addHabit({
      id: nanoid(16),
      name: addInputRef.current.value,
      days: defaultWeekStatus,
      editing: false,
    }));
    addInputRef.current.value = '';
  };
  const deleteHabitHandler = (id: string) => {
    dispatch(deleteHabit(id));
  };
  const updateHabitName = (habit: Habit, newHabitName: string) => {
    if (newHabitName.length === 0) {
      toggleEditing(habit.id, habit.name);
      return;
    }
    dispatch(editHabit({...habit, name: newHabitName, editing: false}));
  };
  const toggleHabitForDay = (habit: Habit, dayIndex: number) => {
    const updatedDays = [...habit.days];
    updatedDays[dayIndex] = !updatedDays[dayIndex];
    dispatch(editHabit({...habit, days: updatedDays}));
  };
  const toggleEditing = (id: string, name: string) => {
    setUpdatedName(name);
    const updatedHabits = [...habits.data].map((habit: Habit) => {
      const updatedHabit = {...habit};
      updatedHabit.editing = id === habit.id ? !habit.editing : false;
      return updatedHabit;
    });
    dispatch(editHabits(updatedHabits));
  };

  return (
    <Layout>
      <Header title='Habits'>
        <Flex direction='row' pt='2'>
          <Input placeholder='Add a new habit' ref={addInputRef} />
          <IconButton
            ml='2'
            onClick={addHabitHandler}
            aria-label="Add prayer"
            icon={<AiOutlinePlusCircle/>} />
        </Flex>
        {habits.data.map((habit: Habit, index: number) => (
          // TODO: convert this into a habit component if possible
          <Box key={`${habit.name}-${index}`} pt='2'>
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
                      {habit.editing ? <Input type='text' placeholder='Edit habits current name' value={updatedName} onChange={handleNameUpdate} ref={editNameInputRef} /> : habit.name}
                    </Box>
                    <IconButton
                      colorScheme={habit.editing ? 'green' : 'gray'}
                      onClick={() => toggleEditing(habit.id, habit.name)}
                      aria-label="Add prayer"
                      icon={<BsPencil/>}/>
                  </Flex>
                  <Wrap spacing={2}>
                    {weekdays.map((value, dayIndex) => (
                    // TODO: figure out how to bring the logic from the colorScheme into a function without breaking the typing from chakra
                      <IconButton colorScheme={habit.days[dayIndex] ? 'green' : !habit.days[dayIndex] && new Date().getDay() === dayIndex ? 'gray' : 'red'} key={`${name}-days-${dayIndex}`}
                        onClick={() => toggleHabitForDay(habit, dayIndex)}
                        variant={habit.days[dayIndex] ? 'solid' : 'outline'} aria-label='Add to friends' icon={<p>{value}</p>} />
                    ))}
                  </Wrap>
                  {habit.editing &&
                <ButtonGroup pt='2'>
                  <Button
                    onClick={() => updateHabitName(habit, editNameInputRef.current !== null ? editNameInputRef.current.value : habit.name)}
                    colorScheme='green' variant='outline'>Update</Button>
                  <Button
                    onClick={() => deleteHabitHandler(habit.id)}
                    colorScheme='red' variant='outline'>Delete</Button>
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
