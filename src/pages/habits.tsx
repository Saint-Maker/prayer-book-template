import {Flex, IconButton, Input} from '@chakra-ui/react';
import {nanoid} from 'nanoid';
import {useEffect, useRef} from 'react';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import {useDispatch, useSelector} from 'react-redux';
import {Habit} from '../components/Habit';
import Header from '../components/Header';
import Layout from '../components/Layout';
import {addHabit, getHabits} from '../redux/slice/habitSlice';
import {AppDispatch, selectHabits} from '../redux/store';

function Habits() {
  const dispatch = useDispatch<AppDispatch>();
  const habits = useSelector(selectHabits);
  const addInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    dispatch(getHabits());
  }, []);

  const addHabitHandler = () => {
    if (addInputRef?.current == undefined || addInputRef.current.value.length === 0) return;
    dispatch(addHabit({
      id: nanoid(16),
      name: addInputRef.current.value,
      days: Array(28).fill(false),
      editing: false,
    }));
    addInputRef.current.value = '';
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
          <Habit key={`${habit.name}-${index}`} habit={habit} />
        ))}
      </Header>
    </Layout>
  );
}

export default Habits;
