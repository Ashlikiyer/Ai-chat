<script lang="ts">
    import MarkdownIt from "markdown-it";

    let response = "";
    let chat = "";
    let isTyping = false;
    const md = new MarkdownIt();

    const onSubmit = async () => {
        if (!chat.trim()) return;

        isTyping = true;
        response = "";

        const req = await fetch("http://localhost:5173/api", { 
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat }) 
        });
        const res2 = await req.json();

        response = res2.message?.content || "";
        isTyping = false;
        chat = ""; // Clear input after sending
    };
</script>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        background: linear-gradient(135deg, #2c3e50, #34495e);
        font-family: "Roboto", "Segoe UI", sans-serif;
        color: #e0e0e0;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .app-container {
        width: 100%;
        max-width: 1200px;
        height: 90vh;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        backdrop-filter: blur(10px);
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
        display: flex;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .sidebar {
        width: 250px;
        background: rgba(0, 0, 0, 0.2);
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .sidebar h1 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #e67e22;
        margin-bottom: 20px;
    }

    .sidebar p {
        font-size: 0.9rem;
        color: #bdc3c7;
        text-align: center;
    }

    .chat-main {
        flex: 1;
        display: flex;
        flex-direction: column;
    }

    .chat-header {
        padding: 20px;
        background: rgba(0, 0, 0, 0.2);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        text-align: center;
        font-size: 1.5rem;
        font-weight: 600;
        color: #e67e22;
    }

    .chat-messages {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
        background: rgba(0, 0, 0, 0.1);
    }

    .message {
        margin-bottom: 15px;
        padding: 15px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #e0e0e0;
        line-height: 1.6;
        font-size: 1rem;
    }

    .message:last-child {
        margin-bottom: 0;
    }

    .typing-indicator {
        padding: 10px;
        text-align: center;
        font-size: 0.9rem;
        color: #e67e22;
        background: rgba(230, 126, 34, 0.1);
        border-top: 1px solid rgba(230, 126, 34, 0.2);
    }

    .chat-input {
        display: flex;
        align-items: center;
        padding: 15px;
        background: rgba(0, 0, 0, 0.2);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .chat-input input {
        flex: 1;
        border: none;
        outline: none;
        padding: 12px 20px;
        font-size: 1rem;
        background: rgba(255, 255, 255, 0.05);
        color: #e0e0e0;
        border-radius: 8px 0 0 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: background 0.3s ease;
    }

    .chat-input input:focus {
        background: rgba(255, 255, 255, 0.1);
    }

    .chat-input input::placeholder {
        color: #bdc3c7;
    }

    .chat-input button {
        background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
        border: none;
        padding: 12px 25px;
        border-radius: 0 8px 8px 0;
        color: #fff;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .chat-input button:hover {
        background: linear-gradient(135deg, #d35400 0%, #c0392b 100%);
        transform: scale(1.05);
    }

    .chat-input button:active {
        transform: scale(0.95);
    }

    @media (max-width: 768px) {
        .app-container {
            flex-direction: column;
            height: 95vh;
        }

        .sidebar {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .chat-main {
            flex: 1;
        }

        .chat-input {
            padding: 10px;
        }

        .chat-input button {
            padding: 10px 20px;
        }
    }
</style>

<div class="app-container">
    <div class="sidebar">
        <h1>Chatbot</h1>
        <p>Welcome to the chatbot interface. Start a conversation by typing below.</p>
    </div>

    <div class="chat-main">
        <div class="chat-header">
            Chat with Bot
        </div>

        <div class="chat-messages">
            {#if response}
                <div class="message">
                    {@html md.render(response.replace(/^[\s\S]*<\/think>(?![\s\S]*<\/think>)/g, ""))}
                </div>
            {:else}
                <div class="message">
                    Hello! How can I assist you today?
                </div>
            {/if}
        </div>

        {#if isTyping}
            <div class="typing-indicator">
                Processing signal...
            </div>
        {/if}

        <div class="chat-input">
            <input type="text" bind:value={chat} placeholder="Type your message..." on:keypress={(e) => e.key === 'Enter' && onSubmit()} />
            <button on:click={onSubmit}>Send</button>
        </div>
    </div>
</div>