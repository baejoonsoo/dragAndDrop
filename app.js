const ball = document.querySelectorAll("#ball");

let currentDroppable = null;

function enterDroppable(elem) {
  // elem.style.background = "pink";
  // alert("goal");
}

function leaveDroppable(elem) {
  // elem.style.background = "";
}

const getLocation = (oneBall) => {
  const { top, left } = oneBall.getBoundingClientRect();

  return { top: top + "px", left: left + "px" };
};

Object.keys(ball).map(async (key) => {
  const oneBall = ball[key];

  const { top, left } = await getLocation(oneBall);

  oneBall.style.position = "absolute";
  oneBall.style.zIndex = 1000;
  oneBall.style.top = top;
  oneBall.style.left = left;

  oneBall.addEventListener("mousedown", (event) => {
    //  공의 가장자리를 눌러도 공이 마우스포인터의 가장자리에 그대로 위치해 있게 한다
    let shiftX = event.clientX - oneBall.getBoundingClientRect().left;
    let shiftY = event.clientY - oneBall.getBoundingClientRect().top;

    // 초기 이동을 고려한 좌표 (pageX, pageY)로 공을 이동
    const moveAt = (pageX, pageY) => {
      oneBall.style.left = pageX - shiftX + "px";
      oneBall.style.top = pageY - shiftY + "px";
    };

    // 포인터 아래로 공을 이동
    // moveAt(event.pageX, event.pageY);

    const onMouseMove = (event) => {
      moveAt(event.pageX, event.pageY);

      oneBall.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      oneBall.hidden = false;

      // 마우스 이벤트는 윈도우 밖으로 트리거 될 수 없다(공을 윈도우 밖으로 드래그 했을 때)
      // clientX∙clientY가 윈도우 밖에 있으면, elementFromPoint는 null을 반환
      if (!elemBelow) return;

      // 잠재적으로 드롭 할 수 있는 요소를 'droppable' 클래스로 지정
      let droppableBelow = elemBelow.closest(".droppable");

      if (currentDroppable != droppableBelow) {
        // 들어오거나 날리거나...
        // 참고: 두 값 모두 null일 수 있음
        //   currentDroppable=null 이벤트 전에 놓을 수 있는 요소 위에 있지 않다면(예: 빈 공간)
        //   droppableBelow=null 이벤트 동안 놓을 수 있는 요소 위에 있지 않다면
        if (currentDroppable) {
          // '날아가는 것'을 처리하는 로직
          leaveDroppable(currentDroppable);
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          // '들어오는 것'을 처리하는 로직
          enterDroppable(currentDroppable);
        }
      }
    };

    document.addEventListener("mousemove", onMouseMove);

    oneBall.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", onMouseMove);
      oneBall.onmouseup = null;
    });

    // 이런 문법도 있네...
    //이벤트리스너랑 똑같음...
    oneBall.ondragstart = () => {
      return false;
    };
  });
});
