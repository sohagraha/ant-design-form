import { NumberOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.min.css'
import TableContainer from './Table';

const Inputform = () => {
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});

    const [insert, setInsert] = useState(new Date());
    console.log(insert);

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = (values) => {
        console.log('Finish:', values);
        const arr = JSON.parse(localStorage.getItem('users')) || [];
        if (arr.length === 0) {
            values.id = 1;
            arr.push(values);
            localStorage.setItem('users', JSON.stringify(arr));
        }
        else {
            const filtered = arr.filter((item) => (item.username === values.username && item.age === values.age));
            if (filtered.length === 0) {
                const maxId = Math.max.apply(Math, arr.map((item) => item.id));
                values.id = maxId + 1;
                arr.push(values);
                localStorage.setItem('users', JSON.stringify(arr));
            }
            else {
                alert('User already exists');
            }
        }
        form.resetFields();
        setInsert(new Date())

    };


    return (
        <>
            <Form form={form} layout="inline" onFinish={onFinish} >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="age"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your age!',
                        },
                    ]}
                >
                    <Input
                        value={"hghdsg"}
                        prefix={<NumberOutlined className="site-form-item-icon" />}
                        placeholder="Age"
                    />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            Add
                        </Button>
                    )}
                </Form.Item>
            </Form>
            <TableContainer change={insert} />
        </>
    );
};

export default Inputform;