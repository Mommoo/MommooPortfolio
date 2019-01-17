import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'youtube-view',
  templateUrl: './youtube-video.component.html',
  styleUrls: ['./youtube-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YoutubeVideoComponent {
  @Input()
  private youtubeToken: string;

  public constructor(private sanitizer: DomSanitizer) {

  }

  public isExistYoutube() {
    return this.youtubeToken !== undefined;
  }

  public get youtubeSrc() {
    const unSafetiedSrc = `https://www.youtube.com/embed/${this.youtubeToken}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(unSafetiedSrc);
  }
}
