import {List} from './list';

describe('list add test', ()=>{
  const list = new List<number>();
  beforeEach(()=>{
    list.add(3);
    list.add(55);
    list.add(66);
  });
  it('list size check', ()=>{
    expect(list.size()).toEqual(3);
    list.remove(2);
    expect(list.size()).toEqual(2);
  });

  it('list get contents compare', ()=>{
    expect(list.get(0)).toEqual(3);
    expect(list.get(1)).toEqual(55);
  });
});

describe('list remove test', ()=>{
  const list = new List<number>();
  list.add(2);
  list.add(22);
  list.add(222);
  list.add(2222);

  list.remove(2);

  it('list get(2) is be 2222', ()=>{
    expect(list.get(2)).toBe(2222);
    expect(list.get(3)).toEqual(undefined);
  })
});

describe('list capacity increase and decrease test', ()=>{
  const list = new List<number>();
  for ( let i = 0; i < 50 ; i++ ) {
    list.add(i);
  }

  it('capacity of list is will be 80', ()=>{
    expect(list.capacity()).toBe(80);
  });

  it('capacity of list will be 40', ()=>{
    for ( let i = 0; i < 12 ; i++ ) {
      list.remove(0);
    }
    expect(list.capacity()).toBe(40);
  })
});

describe('api test',()=>{
  it('addAll test', ()=>{
    const list1 = new List<number>(1,2,3,4,5,6,7,8,9,10);
    const size1 = list1.size();
    const list2 = new List<number>(11,22,33,44,55,66,77,88,99,100);
    const sumSize = size1 + list2.size();

    list1.addAll(list2);
    console.log(list1.toString());
    expect(list1.size()).toEqual(sumSize);
    expect(list1.get(sumSize -1)).toEqual(100);
  });

  it('subList test', ()=>{
    const list1 = new List<number>(1,2,3,4,5,6,7,8,9,10);
    const subList = list1.subList(3,6);
    expect(subList.size()).toEqual(3);
    expect(subList.get(0)).toEqual(4);
    expect(subList.get(2)).toEqual(6);
  })
});
