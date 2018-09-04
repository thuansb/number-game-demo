import { Socket } from "phoenix";

function setupChannel() {
    const socket = new Socket("ws://localhost:4000/socket", { params: { token: 'abc' } })
    socket.connect()

    // Now that you are connected, you can join channels with a topic:
    const channel = socket.channel("room:lobby", {})
    channel.join()
        .receive("ok", resp => { console.log("Joined successfully", resp) })
        .receive("error", resp => { console.log("Unable to join", resp) })
    return channel
}

export default setupChannel;