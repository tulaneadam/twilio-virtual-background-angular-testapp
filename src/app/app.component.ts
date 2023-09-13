import { Component, AfterViewInit } from '@angular/core';
import { createLocalVideoTrack } from 'twilio-video';
import { VirtualBackgroundProcessor } from '@twilio/video-processors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'testang2';

  ngAfterViewInit(): void {
    this.showLocalVideo();
  }

  async showLocalVideo() {
    console.log("2 - button clicked to start showlocalvideo function");
    const videoTrack = await createLocalVideoTrack({
      width: 640,
      height: 480,
      frameRate: 24
    });
    console.log("3 - video track created");

    const videoElement = document.getElementById('video');
    if (videoElement) { // Null check
      videoElement.appendChild(videoTrack.attach());
    }
    console.log("4 - video track attached to video component/element");

    let img = new Image();
    img.src = 'assets/background.jpg';  
  // Make sure tflite-simd-1-0-0.js and selfie_segmentation_landscape.tflite are also available in the same directory as background.jpg
  // Make sure background.jpg is available in the 'assets' directory
    console.log(`5 - image initialized as `, img);
    
    img.onload = async () => {
      console.log(`6 - image loaded as ${img}`);
      const bg = new VirtualBackgroundProcessor({
        assetsPath: '/assets',
  // Update this path to where tflite-simd-1-0-0.js and selfie_segmentation_landscape.tflite are located
  // Make sure all required assets are available in the specified path
        backgroundImage: img,
        maskBlurRadius: 5,
      });
try {
  await bg.loadModel();
} catch (error) {
  console.error("Error loading model:", error);
}

try {
  videoTrack.addProcessor(bg);
} catch (error) {
  console.error("Error adding processor:", error);
}
      console.log(`7 - virtual background processor added as `, bg);
    }
    console.log(`8 - add virtual background function completed`);
  }
}
