import {RequestFrameAnimator} from './request-frame-animator';

describe('test', ()=>{
  it('test gogo', ()=>{
    new RequestFrameAnimator({duration: 3000}).startAnimation(status=>{
      console.log(status);
    })
  })
});
