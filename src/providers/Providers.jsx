import { persistor, store } from "@/redux/store";
import { App, ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import theme from "../../antd.theme.json";

const Providers = ({ children }) => (
    <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
            <ConfigProvider theme={{ ...theme, algorithm: [] }}>
                <App>{children}</App>
            </ConfigProvider>
        </PersistGate>
    </Provider>
);

export default Providers;
