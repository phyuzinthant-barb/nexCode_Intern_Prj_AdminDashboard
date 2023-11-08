import { Table } from 'antd';
import './reports.css';
import { Link } from 'react-router-dom';

const OverallReportTable = ({ selectedValue }) => {
  const getJavaProgrammingData = () => [
    {
      key: 1,
      examName: 'Exam 1',
      level: 'Intermediate',
      examStartDate: '2023-11-10',
      inprogressStudents: '12',
      completedStudents: '8',
    },
    {
      key: 2,
      examName: 'Exam 2',
      level: 'Advanced',
      examStartDate: '2023-12-05',
      inprogressStudents: '15',
      completedStudents: '10',
    },
  ];

  const getReactJSData = () => [
    {
      key: 3,
      examName: 'Redux',
      level: 'basic',
      examStartDate: '2023-11-10',
      inprogressStudents: '10',
      completedStudents: '79',
    },
    {
      key: 4,
      examName: 'React Router',
      level: 'intermediate',
      examStartDate: '2023-11-10',
      inprogressStudents: '33',
      completedStudents: '56',
    },
  ];

  const getUIData = () => [
    {
      key: 5,
      examName: 'UI exam 1',
      level: 'Advanced',
      examStartDate: '2023-11-10',
      inprogressStudents: '40',
      completedStudents: '39',
    },
    {
      key: 6,
      examName: 'UI exam 2',
      level: 'intermediate',
      examStartDate: '2023-11-10',
      inprogressStudents: '22',
      completedStudents: '57',
    },
  ];

  const getUXData = () => [
    {
      key: 7,
      examName: 'UX exam 1',
      level: 'Advanced',
      examStartDate: '2023-11-10',
      inprogressStudents: '3',
      completedStudents: '47',
    },
    {
      key: 8,
      examName: 'UX exam 2',
      level: 'intermediate',
      examStartDate: '2023-11-10',
      inprogressStudents: '44',
      completedStudents: '6',
    },
  ];

  const dataSource = (() => {
    switch (selectedValue) {
      case 'Java-Programming':
        return getJavaProgrammingData();
      case 'React JS':
        return getReactJSData();
      case 'UI':
        return getUIData();
      case 'UX':
        return getUXData();
      default:
        return [];
    }
  })();

  const dataWithSerialNumbers = dataSource.map((item, index) => ({
    ...item,
    serialNumber: index + 1,
  }));

  const columns = [
    {
      title: 'No',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
    },
    {
      title: 'Exam Name',
      dataIndex: 'examName',
      key: 'examName',
      render: (text) => <Link to='examReport'>{text}</Link>,
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Exam Start Date',
      dataIndex: 'examStartDate',
      key: 'examStartDate',
    },
    {
      title: 'Inprogress Students',
      dataIndex: 'inprogressStudents',
      key: 'inprogressStudents',
    },
    {
      title: 'Completed Students',
      dataIndex: 'completedStudents',
      key: 'completedStudents',
    },
  ];

  return (
    <div className="course-report-table">
      <Table dataSource={dataWithSerialNumbers} columns={columns} />
    </div>
  );
};

export default OverallReportTable;
