import { VoterService } from './voter.service'
import { ISession } from '../shared/event.model'
import { Observable, of } from 'rxjs'

describe('VoterService tests', () => {
    let voterService: VoterService, mockHttp;

    beforeEach( () => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post'])
        voterService = new VoterService(mockHttp)
    })

    describe('deleteVoter Tests', () => {

        it('should remove the voter from the list of voters', () => {
            let session = {id: 6, voters: ["joe", "john"]};

            // to return Observable after delete call, which could be anything
            mockHttp.delete.and.returnValue(of(false));

            voterService.deleteVoter(3, <ISession>session, "joe");
            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe("john");
        })

        it('should call http.delete with a right url', () => {
            let session = {id: 6, voters: ["joe", "john"]};

            // to return Observable after delete call, which could be anything
            mockHttp.delete.and.returnValue(of(false));
            voterService.deleteVoter(3, <ISession>session, "joe");

            expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe')
        })
    })

    describe('addVoter tests', () => {

        it('should call http.post with a right url', () => {
            let session = {id: 6, voters: ["john"]};

            // to return Observable after delete call, which could be anything
            mockHttp.post.and.returnValue(of(false));
            voterService.addVoter(3, <ISession>session, "joe");

            expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/joe', {}, jasmine.any(Object))
        })
    })

})