// // src/Login.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import apiConfig from './apiConfig';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [result, setResult] = useState(null);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(apiConfig.login, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, password })
//       });
//       const data = await response.json();

//       // 登录成功
//       if (data.code === 200 && data.data && data.data.token) {
//         Cookies.set('token', data.data.token, { expires: 7 }); // 设置 Cookie
//         // 跳转到 /users
//         navigate('/users');
//       } else {
//         setResult({ message: data.message || '登录失败' });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setResult({ message: '请求错误' });
//     }
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
//       <h2>登录</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>用户名:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={e => setUsername(e.target.value)}
//             placeholder="admin"
//             required
//           />
//         </div>
//         <div style={{ marginTop: '10px' }}>
//           <label>密码:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             placeholder="888888"
//             required
//           />
//         </div>
//         <button type="submit" style={{ marginTop: '20px' }}>登录</button>
//       </form>

//       {result && (
//         <div style={{ marginTop: '20px' }}>
//           <h3>返回数据：</h3>
//           <pre>{JSON.stringify(result, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Login;
// src/Login.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import apiConfig from './apiConfig';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [result, setResult] = useState(null);

//   const navigate = useNavigate();

//   // 登录提交
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(apiConfig.login, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, password })
//       });
//       const data = await response.json();

//       if (data.code === 200 && data.data && data.data.token) {
//         Cookies.set('token', data.data.token, { expires: 7 });
//         navigate('/users');
//       } else {
//         setResult({ message: data.message || '登录失败' });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setResult({ message: '请求错误' });
//     }
//   };

//   // 重置输入
//   const handleReset = () => {
//     setUsername('');
//     setPassword('');
//     setResult(null);
//   };

//   return (
//     <div style={styles.container}>
//       {/* 这里注入动画 keyframes */}
//       <style>
//         {`
//           @keyframes floatRocket {
//             0% { transform: translateY(0px); }
//             50% { transform: translateY(-10px); }
//             100% { transform: translateY(0px); }
//           }
//           @keyframes floatCard {
//             0% { transform: translateY(0px); }
//             50% { transform: translateY(-5px); }
//             100% { transform: translateY(0px); }
//           }
//         `}
//       </style>

//       {/* 左侧插画：火箭 + 悬浮动画 */}
//       <div style={styles.illustrationContainer}>
//         <img
//           src="https://q0.itc.cn/q_70/images03/20240405/f5506381128b42fbbf0deeedced9f038.png"
//           alt="Rocket"
//           style={styles.rocket}
//         />
//       </div>

//       {/* 右侧登录卡片：带悬浮动画 */}
//       <div style={styles.loginCard}>
//         <h2 style={styles.loginTitle}>Manage Platform</h2>

//         <form onSubmit={handleSubmit} style={styles.form}>
//           <div style={styles.formGroup}>
//             <label style={styles.label}>用户名:</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="admin / user"
//               required
//               style={styles.input}
//             />
//           </div>

//           <div style={styles.formGroup}>
//             <label style={styles.label}>密  码:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="123456"
//               required
//               style={styles.input}
//             />
//           </div>

//           <div style={styles.buttonGroup}>
//             <button
//               type="button"
//               onClick={handleReset}
//               style={{ ...styles.button, ...styles.resetButton }}
//             >
//               重置
//             </button>
//             <button
//               type="submit"
//               style={{ ...styles.button, ...styles.loginButton }}
//             >
//               登录
//             </button>
//           </div>
//         </form>

//         {result && (
//           <div style={styles.result}>
//             <p style={styles.errorText}>{result.message}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     // 使用本地的 svg 图片作为背景
//     width: '100vw',
//     height: '100vh',
//     background: 'url("/assets/login_bg.svg") no-repeat center center / cover',
//     display: 'flex',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     overflow: 'hidden',
//     position: 'relative'
//   },
//   illustrationContainer: {
//     flex: 1,
//     display: 'flex',
//     justifyContent: 'center'
//   },
//   rocket: {
//     width: '60%',
//     maxWidth: 500,
//     animation: 'floatRocket 3s ease-in-out infinite'
//   },
//   loginCard: {
//     width: 350,
//     padding: '40px 32px',
//     background: '#fff',
//     boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//     borderRadius: 8,
//     display: 'flex',
//     flexDirection: 'column',
//     animation: 'floatCard 3s ease-in-out infinite',
//     marginRight: 250
//   },
//   loginTitle: {
//     marginBottom: 30,
//     textAlign: 'center',
//     color: '#333'
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   formGroup: {
//     marginBottom: 20
//   },
//   label: {
//     marginBottom: 6,
//     fontWeight: 'bold',
//     color: '#555'
//   },
//   input: {
//     width: '250px', // 缩短输入框
//     padding: '8px 10px',
//     fontSize: 14,
//     border: '1px solid #ccc',
//     borderRadius: 4,
//     outline: 'none'
//   },
//   buttonGroup: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     marginTop: 10,
//     marginRight: 10
//   },
//   button: {
//     flex: 1,
//     padding: '10px 16px',
//     fontSize: 14,
//     borderRadius: 4,
//     border: 'none',
//     cursor: 'pointer'
//   },
//   resetButton: {
//     backgroundColor: '#f0f0f0',
//     color: '#333',
//     marginRight: 16
//   },
//   loginButton: {
//     backgroundColor: '#1890ff',
//     color: '#fff'
//   },
//   result: {
//     marginTop: 20,
//     textAlign: 'center'
//   },
//   errorText: {
//     color: '#ff4d4f'
//   }
// };

// export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import apiConfig from './apiConfig';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);

  const navigate = useNavigate();

  // 登录提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiConfig.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (data.code === 200 && data.data && data.data.token) {
        Cookies.set('token', data.data.token, { expires: 7 });
        navigate('/users');
      } else {
        setResult({ message: data.message || '登录失败' });
      }
    } catch (error) {
      console.error('Error:', error);
      setResult({ message: '请求错误' });
    }
  };

  // 重置输入
  const handleReset = () => {
    setUsername('');
    setPassword('');
    setResult(null);
  };

  return (
    <div style={styles.container}>
      {/* 新增的外围容器 */}
      <div style={styles.outsideBox}>
        <style>
          {`
            @keyframes floatRocket {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0px); }
            }
          `}
        </style>

        {/* 左侧插画：火箭 + 悬浮动画 */}
        <div style={styles.illustrationContainer}>
          <img
            src="https://q0.itc.cn/q_70/images03/20240405/f5506381128b42fbbf0deeedced9f038.png"
            alt="Rocket"
            style={styles.rocket}
          />
        </div>

        {/* 右侧登录卡片 */}
      <div style={styles.loginCard}>
        <h2 style={styles.loginTitle}>Manage Platform</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>用户名:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin / user"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>密  码:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="123456"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.buttonGroup}>
            <button
              type="button"
              onClick={handleReset}
              style={{ ...styles.button, ...styles.resetButton }}
            >
              重置
            </button>
            <button
              type="submit"
              style={{ ...styles.button, ...styles.loginButton }}
            >
              登录
            </button>
          </div>
        </form>

        {result && (
          <div style={styles.result}>
            <p style={styles.errorText}>{result.message}</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    // 保持原有样式不变
    width: '100vw',
    height: '100vh',
    background: 'url("/assets/login_bg.svg") no-repeat center center / cover',
    display: 'flex',
    justifyContent: 'center', // 调整布局居中
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative'
  },
  outsideBox: {
    // 新增的外围框样式
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    padding: 24,
    width: '80%',
    maxWidth: 1200,
    minHeight: 500,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'relative'
  },
  illustrationContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: 24
  },
  rocket: {
    width: '80%',
    maxWidth: 500,
    animation: 'floatRocket 3s ease-in-out infinite',
    marginLeft: -100
  },
  loginCard: {
    width: 350,
    padding: '40px 32px',
    background: '#fff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    borderRadius: 12, // 增加登录卡片圆角
    display: 'flex',
    flexDirection: 'column',
    marginRight: 60
  },
  loginTitle: {
    marginBottom: 30,
    textAlign: 'center',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formGroup: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: 6,
    fontWeight: 'bold',
    color: '#555'
  },
  input: {
    width: '90%',
    padding: '8px 10px',
    fontSize: 14,
    border: '1px solid #ccc',
    borderRadius: 4,
    outline: 'none'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
    marginRight: 10
  },
  button: {
    flex: 1,
    padding: '10px 16px',
    fontSize: 14,
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer'
  },
  resetButton: {
    backgroundColor: '#f0f0f0',
    color: '#333',
    marginRight: 16
  },
  loginButton: {
    backgroundColor: '#1890ff',
    color: '#fff'
  },
  result: {
    marginTop: 20,
    textAlign: 'center'
  },
  errorText: {
    color: '#ff4d4f'
  }
};

export default Login;
    