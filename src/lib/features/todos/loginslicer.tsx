import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface LoginState {
  username: string;
  password: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: LoginState = {
  username: '',
  password: '',
  status: 'idle',
  error: null,
  isAuthenticated: false,
  token: null,
};
 //query que vai para o login caso sue back n tenha o prefixo "user" antes do jsson com as autenficações tire o use do async abaixo
 export const login = createAsyncThunk('login', async (user:  { username: string; password: string; } ) => {
  const response = await fetch('http://127.0.0.1:8000/login', {
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

  const token = response.headers.get('Authorization');
  if (token) {
    return { user: await response.json(), token };
  }

  const data = await response.json();
  return { user: data, token: null };
});


export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
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
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setUsername, setPassword } = loginSlice.actions;

export default loginSlice.reducer;