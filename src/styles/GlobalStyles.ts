import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    *, button, input {
        border: 0;
        outline: 0;

        font-family: 'Open Sans', sans-serif;
    }

    * {
        -webkit-user-drag: none;
        user-select: none;
    }

    html, body, #root {
        display: flex;
        flex: 1;
        height: 100%;
    }

    body {
        overflow-y: hidden;
    }

    .flex {
        display: flex;
    }

    .flex-1 {
        flex: 1;
    }

    .drag {
        -webkit-app-region: drag;
    }

    .no-drag {
        -webkit-app-region: no-drag;
    }

    :root {
        --menu-height: 30px;
        --background: #1a191b;
        --background-secondary: #242526;
        --background-terciary: #3A3B3C;
        --border: rgba(255,255,255,0.2);

        --text: #fff;
        --text-dark: '#ffffffcc';
        --text-secondary: #7f7fff;

        --sfw: #549254;
        --nsfw: #a00000;
        --sketchy: #b4b400;

        --icon: rgba(255,255,255,0.65);

        --moderator: #2ab559;
        --user: #08A6F6;
        --administrator: #edcb43;
        --developer: #ed6743;
        --owner: #b336ed;
    }

    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        /* box-shadow: inset 0 0 5px black;  */
        /* border-radius: 10px; */
        background: var(--background-secondary); 
    }
    
    ::-webkit-scrollbar-thumb {
        background: var(--background-terciary); 
        border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: var(--border); 
    }
`;
