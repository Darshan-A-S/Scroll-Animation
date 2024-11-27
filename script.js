const frames = {
    currIndx: 0,
    maxIdx: 556,
  };
  
  let imagesLoaded = 0;
  let images = [];
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");
  
  function preLoad() {
    for (let i = 1; i <= frames.maxIdx; i++) {
      const imageUrl = `./frames/frame_${i.toString().padStart(4, "0")}.jpg`;
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === frames.maxIdx) {
          // Start the scroll animation only after all images are loaded
          loadimages(frames.currIndx);
          initAnimation(); // Start the animation setup
        }
        images.push(img);
      };
    }
  }
  
  function loadimages(index) {
    if (index >= 0 && index <= frames.maxIdx) {
      const img = images[index];
  
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  
      const scaleX = canvas.width / img.width;
      const scaleY = canvas.height / img.height;
      const scale = Math.max(scaleX, scaleY);
  
      const newWidth = img.width * scale;
      const newHeight = img.height * scale;
  
      const offsetX = (canvas.width - newWidth) / 2;
      const offsetY = (canvas.height - newHeight) / 2;
  
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
    }
  }
  
  function render() {
    requestAnimationFrame(() => {
      loadimages(Math.floor(frames.currIndx));
    });
  }
  
  function initAnimation() {
    gsap.registerPlugin(ScrollTrigger);
  
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".parent", // Ensure there is an element with this class in your HTML
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
        onUpdate: (self) => {
          frames.currIndx = self.progress * frames.maxIdx;
          render(); // Call render function to update the frame
        },
      },
    });
  }
  
  preLoad(); // Start preloading images
  