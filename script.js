const track = document.getElementById("image-track");

function handleOnUp() {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.prevPercentage;
}

function handleOnDown(e) {
  track.dataset.mouseDownAt = e.clientX;
}

function handleOnMove(e) {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2,
    percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.prevPercentage = nextPercentage;

  track.animate(
    {
      translate: `${nextPercentage}% -50%`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% 50%`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
}

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);
