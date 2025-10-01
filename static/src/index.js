
$(async function(){
    await import("./js/utils/counter");
    await import("./js/utils/handleEffect");
    await import("infiniteslidev2");
    await import("jquery-validation");
    await import("lazysizes");
    await import("odometer");
    await import("gsap/SplitText");
    await import("./js/swiper/index");
    await import("gsap/ScrollSmoother");
    await import("lightbox2");
    await import("./js/main");

    function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const secondsStr = seconds < 10 ? '0' + seconds : seconds;
    const timeString = `${hours}:${minutesStr}:${secondsStr} ${ampm}`;
    $('#clock').text(timeString);
}
updateClock();
setInterval(updateClock, 1000);
$("#year").text(new Date().getFullYear())
});
