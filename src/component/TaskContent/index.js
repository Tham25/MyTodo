import HeaderTaskContent from './HeaderTaskContent';
import TaskContentList from './TaskContentList';

function TaskContent({ title, taskName, note = '' }) {
  return (
    <>
      <HeaderTaskContent title={title} sx={{ padding: '16px 24px' }} />
      <TaskContentList taskName={taskName} note={note} />
    </>
  );
}

export default TaskContent;
