// mui theme settings
export const themeSettings = () => {
    return {
        palette: {
            // palette values for dark mode
            primary: {
                main: "#0f77ff",
            },
            secondary: {
                main: "#2C3333",
            },
            background: {
                default: "#f5f5f5",
            },
        },
        typography: {
            h1: {
                fontSize: 32,
                fontWeight: 600,
            },
            h2: {
                fontSize: 28,
                fontWeight: 600,
                fontFamily: "Poppins, sans- serif"
            },
            h3: {
                fontSize: 22,
                fontWeight: 500,
                fontFamily: "Poppins, sans- serif"
            },
            h4: {
                fontSize: 20,
                fontWeight: 500,
                fontFamily: "Poppins, sans- serif"
            },
            h5: {
                fontSize: 16,
                fontWeight: 500,
                fontFamily: "Poppins, sans- serif"
            },
            h6: {
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "Poppins, sans- serif"
            },
            p: {
                fontSize: 13,
                fontFamily: "Open Sans, sans-serif"
            },
            button: {
                fontFamily: "Open Sans, sans-serif",
                fontWeight: 600,
            }
        }
    };
};

