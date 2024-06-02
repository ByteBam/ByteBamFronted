'use client';
import React from 'react';
import { Button, Steps, Table, ConfigProvider, Tree, Popover, message } from 'antd';
import type { TableProps, TreeDataNode, TreeProps } from 'antd';
import { CgBolt, CgChevronLeft, CgChevronRight } from 'react-icons/cg';
import { useState } from 'react';
import './page.css';
import { error } from 'console';
import Item from 'antd/es/list/Item';

const LinkOrchestration: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  interface DataType {
    key: string;
    data: string;
    body: string;
  }
  // 设置要发送的数据
  const datas = {
    userId: '1789657929859862528',
    periodicLineId: '8a9643d98f701ee1018f70232eb7000c',
  };
  const dataArray = Object.keys(datas).map((key, index) => ({
    title: key + ' ' + typeof key,
    key: `0-${index}`,
  }));
  const demo = JSON.stringify(datas, null, 2);
  const treeData: TreeDataNode[] = dataArray;
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  // 发送POST请求
  fetch('http://114.116.241.37:8081/api/periodicline/query', {
    method: 'POST', // 指定请求方法为POST
    headers: {
      'Content-Type': 'application/json', // 设置请求头，指定发送的数据类型为JSON
    },
    body: JSON.stringify(datas), // 将数据转换为JSON字符串作为请求体发送
  })
    .then((response) => {
      // 请求成功处理逻辑
      if (!response.ok) {
        throw new Error('请求失败！');
      }
      return response.json(); // 将响应体解析为JSON数据
    })
    .then((data) => {
      // 处理返回的JSON数据
      console.log(data);
    })
    .catch((error) => {
      // 错误处理逻辑
      console.error('POST请求出错：', error);
    });

  const code = {
    code: 0,
    message: 'string',
    data: {
      data: [
        {
          id: 'string',
          name: 'string',
          status: 'string',
          reqSchema: 'string',
          respSchema: 'string',
          reqExp: 'string',
          respExp: 'string',
        },
      ],
      pipelineId: 'string',
      pipelineName: 'string',
      status: 0,
    },
  };
  const responseBody = JSON.stringify(code, null, 2);
  const convertJsonToArray = (obj: any, keyPrefix: string = '0') => {
    const result: any = [];

    if (typeof obj === 'object' && !Array.isArray(obj)) {
      Object.keys(obj).forEach((key, index) => {
        const newKey = `${keyPrefix}-${index}`;
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
          result.push({
            title: key + ' ' + typeof key,
            key: newKey,
            children: convertJsonToArray(value, newKey),
          });
        } else {
          result.push({
            title: key + ' ' + typeof key,
            key: newKey,
          });
        }
      });
    } else if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        const newKey = `${keyPrefix}-${index}`;
        result.push(...convertJsonToArray(item, newKey));
      });
    }

    return result;
  };

  const dataArr = convertJsonToArray(code);
  const ev: TreeDataNode[] = [
    {
      title: 'code' + ' ' + typeof code.code,
      key: '0-0',
    },
    {
      title: 'message' + ' ' + typeof code.message,
      key: '0-1',
    },
    {
      title: 'data' + ' ' + typeof code.data,
      key: '0-2',
      children: [
        {
          title: 'data' + ' ' + typeof code.data.data,
          key: '0-2-0',
          children: [
            {
              title: 'id' + ' ' + typeof code.data.data[0].id,
              key: '0-2-0-0',
            },
            {
              title: 'name' + ' ' + typeof code.data.data[0].name,
              key: '0-2-0-1',
            },
            {
              title: 'status' + ' ' + typeof code.data.data[0].status,
              key: '0-2-0-2',
            },
            {
              title: 'reqSchema' + ' ' + typeof code.data.data[0].reqSchema,
              key: '0-2-0-3',
            },
            {
              title: 'respSchema' + ' ' + typeof code.data.data[0].respSchema,
              key: '0-2-0-4',
            },
            {
              title: 'reqExp' + ' ' + typeof code.data.data[0].reqExp,
              key: '0-2-0-5',
            },
            {
              title: 'respExp' + ' ' + typeof code.data.data[0].respExp,
              key: '0-2-0-6',
            },
          ],
        },
        {
          title: 'pipelineId' + ' ' + typeof code.data.pipelineId,
          key: '0-2-1',
        },
        {
          title: 'pipelineName' + ' ' + typeof code.data.pipelineName,
          key: '0-2-2',
        },
        {
          title: 'status' + ' ' + typeof code.data.status,
          key: '0-2-3',
        },
      ],
    },
  ];
  const handleCopy = (title: string) => {
    navigator.clipboard
      .writeText(title)
      .then(() => {
        messageApi.open({
          type: 'success',
          content: '已复制',
        });
      })
      .catch((err) => {
        messageApi.open({
          type: 'error',
          content: '复制失败',
        });
      });
  };
  return (
    <>
      {contextHolder}
      <div className="link-header ">
        <span className="bg-[#67e8f9] border-2 m-2">链路名称</span>
        <div className="bg-[#fff] flex ">
          <Button type="primary" className="m-1">
            保存
          </Button>
          <Button type="primary" className="m-1 flex leading-4 justify-center items-center">
            <CgBolt className="w-4 h-4 " />
            运行
          </Button>
          <Button type="primary" className="m-1 flex justify-center items-center">
            <CgChevronLeft className="w-4 h-4 " />
            返回上级
          </Button>
        </div>
      </div>
      <div className="link-orchestration flex items-center">
        <Steps
          className=" m-4"
          // current={3}
          onChange={onChange}
          items={[
            {
              title: '',
              status: 'finish',
            },
            {
              title: '',
              status: 'finish',
            },
            {
              title: '',
              status: 'finish',
            },
            {
              title: '',
              status: 'finish',
            },
            {
              title: '',
              status: 'finish',
            },
            {
              title: '',
              status: 'finish',
            },
          ]}
        />
      </div>
      <div className="flex">
        <div className="link-request">
          <table
            width={'100%'}
            className="border-2"
            style={{
              borderCollapse: 'separate',
              borderSpacing: 0,
              fontSize: 14,
              border: '1px solid #9ce0ff',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              overflow: 'hidden',
            }}
          >
            <thead
              style={{
                borderRadius: 10,
                borderBottom: '2px solid #e5e7eb',
              }}
            >
              <tr className="bg-[#9ce0ff] h-12">
                <th style={{ borderRight: '2px solid #e5e7eb' }}>请求参数</th>
                <th>请求示例</th>
              </tr>
            </thead>
            <tbody className="font-thin">
              <tr>
                <th
                  className="text-left whitespace-pre-wrap font-normal p-3"
                  style={{ borderRight: '2px solid #e5e7eb' }}
                >
                  <ConfigProvider
                    theme={{
                      components: {
                        Tree: {
                          /* 这里是你的组件 token */
                          nodeSelectedBg: '#9cffb8',
                          nodeHoverBg: '#c2ffd3',
                        },
                      },
                    }}
                  >
                    <Tree
                      showLine
                      switcherIcon={<CgChevronRight />}
                      defaultExpandedKeys={['0-0-0']}
                      onSelect={onSelect}
                      treeData={treeData}
                      titleRender={(key: any) => {
                        const data = key.title.split(' ');
                        return (
                          <div>
                            <Popover content={'点击复制'}>
                              <span
                                className="
                              bg-[#def3ff] 
                              text-[#1c7aff] 
                              rounded-sm 
                              underline 
                              hover:decoration-dotted"
                                onClick={() => handleCopy(data[0])}
                              >
                                {data[0]}{' '}
                              </span>
                            </Popover>
                            <span className="m-2 text-[#ff8641]"> {data[1]}</span>
                          </div>
                        );
                      }}
                    />
                  </ConfigProvider>
                </th>
                <th className="text-left whitespace-pre-wrap font-normal p-3">{demo}</th>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="link-responseparameters">
          <table
            width={'100%'}
            className="border-2"
            style={{
              borderCollapse: 'separate',
              borderSpacing: 0,
              fontSize: 14,
              border: '1px solid #9cffb8',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              overflow: 'hidden',
            }}
          >
            <thead
              style={{
                borderRadius: 10,
                borderBottom: '2px solid #e5e7eb',
              }}
            >
              <tr className="bg-[#9cffb8] h-12">
                <th style={{ borderRight: '2px solid #e5e7eb' }}>响应参数</th>
                <th>响应示例</th>
              </tr>
            </thead>
            <tbody className=" font-thin">
              <tr>
                <th
                  className="text-left whitespace-pre-wrap font-normal p-3 content-start w-1/2"
                  style={{ borderRight: '2px solid #e5e7eb' }}
                >
                  <ConfigProvider
                    theme={{
                      components: {
                        Tree: {
                          /* 这里是你的组件 token */
                          nodeSelectedBg: '#9ce0ff',
                          nodeHoverBg: '#c8eeff',
                        },
                      },
                    }}
                  >
                    {contextHolder}
                    <Tree
                      showLine
                      switcherIcon={<CgChevronRight />}
                      defaultExpandedKeys={['0-0-0']}
                      onSelect={onSelect}
                      treeData={dataArr}
                      titleRender={(key: any) => {
                        const data = key.title.split(' ');
                        console.log('data', data);

                        return (
                          <div>
                            <Popover content={'点击复制'}>
                              <span
                                className="
                              bg-[#caffd9] 
                              text-[#1c7aff] 
                              rounded-sm underline 
                              hover:decoration-dotted"
                                onClick={() => handleCopy(data[0])}
                              >
                                {data[0]}{' '}
                              </span>
                            </Popover>
                            <span className="m-2 text-[#ff8641]"> {data[1]}</span>
                          </div>
                        );
                      }}
                    />
                  </ConfigProvider>
                </th>
                <th className="text-left whitespace-pre-wrap font-normal p-3">{responseBody}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LinkOrchestration;
