import { Button, Form, Input, Modal, Popconfirm, Radio, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';


const CollectionCreateForm = ({ open, onCreate, onCancel, editUser }) => {
    const [form] = Form.useForm();
    console.log('editUser', editUser)
    return (
        <Modal
            open={open}
            title="Create a new collection"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        values.id = editUser.id;
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    username: editUser.username,
                    age: editUser.age,
                }}
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of collection!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="age" label="Age">
                    <Input type="textarea" />
                </Form.Item>
                {/* <Form.Item name="modifier" className="collection-create-form_last-form-item">
                    <Radio.Group>
                        <Radio value="public">Public</Radio>
                        <Radio value="private">Private</Radio>
                    </Radio.Group>
                </Form.Item> */}
            </Form>
        </Modal>
    );
};


const TableContainer = ({ change }) => {
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({})

    const onCreate = (values) => {
        const data = JSON.parse(localStorage.getItem('users')) || [];
        data.map((item) => {
            if (item.id === values.id) {
                item.username = values.username;
                item.age = values.age;
            }
        });
        localStorage.setItem('users', JSON.stringify(data));
        setOpen(false);
        setCurrentUser({})
    };

    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        const arr = JSON.parse(localStorage.getItem('users')) || [];
        setDataSource(arr);
    }, []);

    const handleDelete = (user) => {
        const arr = JSON.parse(localStorage.getItem('users')) || [];
        const newData = arr.filter((item) => (JSON.stringify(item) !== JSON.stringify(user)));
        localStorage.setItem('users', JSON.stringify(newData));
        setDataSource(newData);
    };

    const defaultColumns = [
        {
            title: 'username',
            dataIndex: 'username',
            width: '30%',
            editable: true,
        },
        {
            title: 'age',
            dataIndex: 'age',
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, user) =>
                dataSource.length >= 1 ? (
                    <>
                        <div>
                            <Button
                                type="primary"
                                onClick={() => {
                                    setCurrentUser(user)
                                    setOpen(true);
                                }}
                            >
                                Edit
                            </Button>

                        </div>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(user)}>
                            <a>Delete</a>
                        </Popconfirm>
                    </>
                ) : null,
        },
    ];



    return (
        <div>
            <CollectionCreateForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false);
                    setCurrentUser({})
                }}
                editUser={currentUser}
            />
            <Table
                bordered
                dataSource={dataSource}
                columns={defaultColumns}
            />
        </div>
    );
};

export default TableContainer;