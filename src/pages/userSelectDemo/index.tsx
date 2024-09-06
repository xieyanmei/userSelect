import React, { useMemo, useRef, useState } from 'react';
import axios from 'axios'
import userData from './mock'

import UserSelect from '../../components/UserSelect'
interface UserValue {
  label: string;
  value: string;
}

// 接口取
async function fetchUserList(keyword: string): Promise<UserValue[]> {
  return new Promise((resolve,reject)=>{
    const res =  axios.get(`http://mock.com/getUser?keyWord=${keyword}`)
    if(res.Error){
      reject(res.Error)
    }else{
      let users =  res.Data.map(
        (user: { UserName: string,UserAge:number, UserId:string}) => ({
          label: `${user.UserName}`,
          value: user.UserId,
        }),
      )
      resolve(users)
    }
  })


}
// mock 数据
async function fetchUserListMock(username: string): Promise<UserValue[]> {
  console.log('fetching user', username);
  return new Promise(resolve=>{
   let users =  userData.map(
      (user: { UserName: string,UserAge:number, UserId:string}) => ({
        label: `${user.UserName}`,
        value: user.UserId,
      }),
    )
    resolve(users)
  })
}

const Demo: React.FC = () => {
  const [value, setValue] = useState<UserValue[]>([]);
  return (
    <div>
    <UserSelect
      mode="multiple"
      value={value}
      placeholder="请选择用户"
      fetchOptions={fetchUserListMock}
      onChange={(newValue) => {
        setValue(newValue as UserValue[]);
      }}
      style={{ width: '100%' }}
    />
    <div>
      您当前选中的用户有：
      {value.length>0?(
        value.map(user=><span key={user.value}>{user.label}</span>)
      ):(<p>无</p>)
      }
    </div>
    </div>
  );
};
export default Demo