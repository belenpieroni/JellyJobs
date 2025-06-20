import { Form, Input, Button,notification } from 'antd';
import { useState } from "react";
import { LeftCircleFilled } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";
import '../../assets/styles/pages/login.css';
import React from 'react'; 
import videoFondo from '../../assets/images/medumedusin.mp4';
import Cookies from "js-cookie";
import { useUser } from "../../context/UserContext"; //IMPORTACIÓN DEL CONTEXTO USERCONTEXT

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [setError] = useState("");
  const { setUser } = useUser(); // PARA ACTUALIZAR EL CONTEXTO

  const onFinish = async (values) => {
    try {
      const response = await fetch("http://localhost:9001/app/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        credentials: "include", 
      });

      if (!response.ok) {
        notification.error({
          message: "Error",
          description: "Hubo un problema al enviar los datos.",
        });
        throw new Error("Credenciales incorrectas");
        
      }
      notification.success({
        message: "Éxito",
        description: "Bienvenido...",
      });

      const data = await response.json();
      Cookies.set("access_token", data.access); // Almacena el JWT en cookies

      //GUARDAMOS LOS DATOS DEL ADMIN EN EL CONTEXTO
      setUser({
        email: data.email,
        id: data.idadmin,
        role: "admin", //ROL
      });

      navigate("/home"); 
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <div className='contein-login-page'>
      <video autoPlay loop muted className='full-screen-background'>
        <source src={videoFondo} type="video/mp4" />
        Tu navegador no soporta el formato de video.
      </video>
      <Link to="/" className="back-arrow">
        <LeftCircleFilled />
      </Link>
      <div className='form-part box'>
        <h1 className='title-form'>Iniciar Sesión</h1>
        <Form
          className='loginform'
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 22 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            className='form-items'
            name="email"
            rules={[
              { type: 'email', message: 'Por favor, ingresa un email válido.' },
              { required: true, message: 'Por favor, ingresa tu email.' }
            ]}
          >
            <Input placeholder='Email' />
          </Form.Item>

          <Form.Item
            className='form-items'
            name="contrasena" 
            rules={[
              { required: true, message: 'Por favor, ingresa tu contraseña.' }
            ]}
          >
            <Input.Password placeholder='Contraseña' />
          </Form.Item>

          <Form.Item className='form-button'>
            <Button className='login-button' type="primary" htmlType="submit">
              Acceder
            </Button>
          </Form.Item>

          <p className="page-link">
            <Link to="/forgot-password" className="page-link-label">
              ¿Olvidaste tu contraseña?
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;

