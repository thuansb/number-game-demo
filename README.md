# number-game-demo
Phoenix socket demo: client code


# Backend code

user_socket.ex
```
## Transports
  transport :websocket, Phoenix.Transports.WebSocket
```

room_channel.ex
```
defmodule RcsWeb.RoomChannel do
  use Phoenix.Channel

  def join("room:lobby", _message, socket) do
    {:ok, socket}
  end

  def handle_in("found_num", %{"num" => num}, socket) do
    broadcast! socket, "found_num", %{num: num}
    {:noreply, socket}
  end
end

```
