// import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Router } from './Router';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';
// import { lightTheme } from './styles/themes/light';

export const App = () => {
	// let currentThemeName = 'defaultTheme';
	// const [themeName, setThemeName] = useState(defaultTheme);

	return (
		<ThemeProvider theme={defaultTheme}>
			<BrowserRouter>
				<Router />
			</BrowserRouter>
			<GlobalStyle />
		</ThemeProvider>
	);
};
