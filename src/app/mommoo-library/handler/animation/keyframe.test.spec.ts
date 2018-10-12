import {KeyframesFinder} from './keyframes-finder';
import {KeyframeAnimator} from './keyframe-animator';
import {DomUtils} from '../../util/dom';
const mockKeyFrames = {
  from : {
    marginLeft: '0px',
    width: '100px',
    height: '300px',
    transform: `scale(0)`
  },
  to: {
    marginLeft: '100px',
    width: '300px',
    height: '600px',
    transform: 'scale(1)'
  }
};

const mockKeyFrames2 = {
  from : {
    marginLeft: '0px',
    width: '100px',
    height: '300px',
    transform: `scale(0)`
  },
  '50%': {
    marginLeft: '100px',
    width: '300px',
    height: '600px',
    transform: 'scale(1)'
  },
  '100%' : {
    backgroundColor: 'orange',
    borderRadius: '50%'
  }
}
describe('keyframes-finder test', ()=> {
  const keyframesFinder = new KeyframesFinder();
  beforeEach(()=>{
    [1, 2, 3].forEach(value=> {
      keyframesFinder.addKeyFrames(`mommoo${value}`, mockKeyFrames)
    })
  });
  it('keyframes-finder size test', ()=>{
    const finder = (keyframesFinder as any).finder;
    expect(finder.size).toEqual(3);
    keyframesFinder.addElementToListenerHandler('mommoo1', document.createElement('div'));
    keyframesFinder.addAnimationListener('mommoo1', ()=>{
      console.log('foo!!');
    });
    keyframesFinder.addElementToListenerHandler('mommoo1', document.createElement('div'));
    keyframesFinder.removeAnimationListener('mommoo1');
    console.log(keyframesFinder);
    console.log(keyframesFinder.wholeCssKeyFrames());
  })
});

describe('keyframeAnimator test', ()=>{
  const keyframeAnimator = new KeyframeAnimator();
  beforeEach(()=>{
    const mommooDiv = DomUtils.styledNewElement({
      width:'500px',
      height:'300px',
      backgroundColor:'red'
    });
    mommooDiv.appendChild(document.createTextNode('Mommoo!!'));
    document.body.appendChild(mommooDiv);
    keyframeAnimator.addKeyFrames('mommoo', mockKeyFrames2);
    keyframeAnimator.startAnimation(mommooDiv, {
      name: 'mommoo',
      duration: '3000ms',
      delay:'5s',
      iterationCount: 1,
      timingFunction: 'cubic-bezier',
      fillMode: 'forwards'
    })
  });
  it('confirm keyframes writed in css', ()=>{

  })
});
