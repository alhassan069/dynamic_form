import assert from 'node:assert/strict';
import {describe, mock,it, before, after} from 'node:test';
describe("some description", ()=>{
    before(()=>{
        console.log("printing before")
    });
    
    it('should return true', ()=>{
        let result = 0;
        let result2 = 0;
        for(let i = 0;i<100;i++){
            result+=i;
        };
        for(let i = 0;i<100;i++){
            result2+=i;
        };

        assert.equal(result,result2);
    })

    after(()=>{
        console.log('printing after')
    })
})