import "antd/dist/antd.css";
import "./App.css";
import { Button, Table, Modal, Input, Form, DatePicker } from "antd";
import { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment"
import { SearchOutlined } from "@ant-design/icons";
import * as api from './api'
const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
};
function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [status, setStatus] = useState(STATUS.IDLE);
  const addBook = async (book) => {
    console.log('need to add book', JSON.stringify(book))
    const { data } = await api.createBook(book);
    console.log('addedBooks', JSON.stringify(data))
    fetchAllBooks()
    toast.success('Book Created Successfully', {autoClose: 1000, hideProgressBar: true})
  }
  const updateBook = async (book) => {
    console.log('in update book', JSON.stringify(book))

    const { data } = await api.updateBook(book._id, book);
    console.log('updatedBooks', JSON.stringify(data))
    fetchAllBooks()
    toast.success('Book Updated Successfully', {autoClose: 1000, hideProgressBar: true})
  }

  const deleteBook = async (book) => {
    const { data } = await api.deleteBook(book._id);
    console.log('deletedBooks', JSON.stringify(data))
    fetchAllBooks()
    toast.success('Book Deleted Successfully', {autoClose: 1000, hideProgressBar: true})

  }
  const fetchAllBooks = async () => {
    api.getBook().then((response) => {
      console.log('data from api =====>', response.data);
      const data = response.data
      const alteredData = data.map((e) => {
        return Object.assign({}, e, e["date_published"] = moment(new Date(e.date_published)).format("YYYY-MM-DD"))
      })
      console.log('data from api(after formated) =====>', alteredData);
      setDataSource(alteredData)
    })
  }
  useEffect(() => {
    fetchAllBooks()
  }, [])

  // Derived state
  const errors = getErrors(editingBook);
  let isValid = Object.keys(errors).length === 0;


  function getErrors(editingBook) {
    const result = {};
    if (!editingBook?.title) result.title = "title is required";
    if (!editingBook?.author) result.author = "author is required";
    if (!editingBook?.publisher) result.publisher = "publisher is required";
    if (!editingBook?.date_published) result.password = "published date is required";
    return result;
  }

  const columns = [
    {
      key: "1",
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title > b.title,
      // sortDirections: ["descend"],
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.title.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      key: "2",
      title: "Author",
      dataIndex: "author",
      sorter: (a, b) => a.author > b.author,
      // sortDirections: ["descend"],
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.author.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      key: "3",
      title: "Publisher",
      dataIndex: "publisher",
      sorter: (a, b) => a.publisher > b.publisher,
      // sortDirections: ["descend"],
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.publisher.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      key: "4",
      title: "Published Date",
      dataIndex: "date_published",
      sorter: (record1, record2) => {
        return moment(record1.date_published).valueOf() - moment(record2.date_published).valueOf()
      },
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.date_published.includes(value);
      },
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditBook(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteBook(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddBook = () => {
    setIsEditing(true);
  };
  const onDeleteBook = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => { deleteBook(record) },
    });
  };
  const onEditBook = (record) => {
    setIsEditing(true);
    setEditingBook({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingBook(null);
    isValid = false
  };
  const showError = () => {
    return (<>
      {!isValid && status === STATUS.SUBMITTED && (
        <div role="alert">
          <p>Please fix the following errors:</p>
          <ul>
            {Object.keys(errors).map((key) => {
              return <li key={key}>{errors[key]}</li>;
            })}
          </ul>
        </div>
      )}
    </>
    );
  };
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={onAddBook}>Add a new Book</Button>
        <Table columns={columns} dataSource={dataSource}>pagination={{ pageSize: 5, total: 50, showSizeChanger: true }} </Table>
        <ToastContainer position={"top-right"} autoClose={1000} />
        <Modal
          title={editingBook?._id ? "Edit Book" : "Add Book"}
          visible={isEditing}
          okButtonProps={{ disabled: !isValid }}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            if (editingBook._id) {
              updateBook(editingBook)
            } else {
              addBook(editingBook)
            }
            resetEditing();
          }}
        >

          <Form.Item label="Title"              >
            <Input placeholder="save button disabled until title field provided"
              value={editingBook?.title}
              onChange={(e) => {
                setEditingBook((pre) => {
                  return { ...pre, title: e.target.value };
                });
              }}
            />
          </Form.Item>
          <Form.Item label="Author" >
            <Input placeholder="save button disabled until author field provided"
              value={editingBook?.author}
              onChange={(e) => {
                setEditingBook((pre) => {
                  return { ...pre, author: e.target.value };
                });
              }}
            />
          </Form.Item>
          <Form.Item label="Publisher">
            <Input placeholder="save button disabled until publisher field provided"
              value={editingBook?.publisher}
              onChange={(e) => {
                setEditingBook((pre) => {
                  return { ...pre, publisher: e.target.value };
                });
              }}
            />
          </Form.Item>
          <Form.Item label="Published Date"          >
            <DatePicker 
            onChange={(date, dateString) => {
              setEditingBook((pre) => {
                return { ...pre, date_published: date};
              });
            }}
             value={editingBook?.date_published ? moment(editingBook?.date_published,'YYYY-MM-DD') :null} 
             />
          </Form.Item>
        </Modal>

      </header>


    </div>
  );
}

export default App
