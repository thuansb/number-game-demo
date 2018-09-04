# number-game-demo
Phoenix socket demo: client code


# Backend code
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
