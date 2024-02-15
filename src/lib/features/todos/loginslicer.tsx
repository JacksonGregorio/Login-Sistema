import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface LoginState {
  email: string;
  password: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: LoginState = {
  email: '',
  password: '',
  status: 'idle',
  error: null,
  isAuthenticated: false,
};
 //query que vai para o login caso sue back n tenha o prefixo "user" antes do jsson com as autenficações tire o use do async abaixo
export const login = createAsyncThunk('login', async (user: { user: { email: string; password: string; } }) => {
  const response = await fetch('http://127.0.0.1:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  //checa resposta do back
  if (!response.ok) {
    throw new Error('Failed to login');
  }

  const data = await response.json();
  return data;
});

//cria o slice E SETA VALORES INICIAIS

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setEmail, setPassword } = loginSlice.actions;

export default loginSlice.reducer;