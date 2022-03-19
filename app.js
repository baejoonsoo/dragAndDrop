const ball = document.getElementById("ball");

ball.addEventListener("mousedown", (event) => {
  //  공의 가장자리를 눌러도 공이 마우스포인터의 가장자리에 그대로 위치해 있게 한다
  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;

  ball.style.position = "absolute";
  ball.style.zIndex = 1000;

  // 초기 이동을 고려한 좌표 (pageX, pageY)로 공을 이동
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - shiftX + "px";
    ball.style.top = pageY - shiftY + "px";
  }

  // 포인터 아래로 공을 이동
  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener("mousemove", onMouseMove);

  ball.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", onMouseMove);
    ball.onmouseup = null;
  });

  ball.ondragstart = () => {
    return false;
  };
});
