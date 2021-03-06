import { Component } from '@angular/core'
import { EventService } from '../shared/event.service'
import { ActivatedRoute, Params } from '@angular/router'
import { IEvent, ISession } from '../shared/index'

@Component({
    selector: 'event-details',
    templateUrl: './event-details.component.html',
    styles: [`
        .container { padding-left:20px; padding-right: 20px; }
        .event-image { height: 100px; }
        a { cursor: pointer }
    `]
})
export class EventDetailsComponent {

    event: IEvent;
    addMode: boolean
    filterBy: string = 'all';
    constructor(private eventService:EventService, private route:ActivatedRoute){

    }

    ngOnInit() {
        this.route.data.forEach( (data) => {
            this.event = data['event'];
            //this.eventService.getEvent(+params['id']).subscribe((event: IEvent) => {
               
            this.addMode = false;
            //})
        })

        // to cast to a number used symbol "+"
        //this.event = this.eventService.getEvent(+this.route.snapshot.params["id"]);
    }

    addSession() {
        this.addMode = true
    }

    saveNewSession(session:ISession) {
        const nextId = Math.max.apply(null, this.event.sessions.map(s=>s.id));
        session.id = nextId + 1
        this.event.sessions.push(session)
        this.eventService.saveEvent(this.event).subscribe();
        this.addMode = false
    }

    cancelAddSession() {
        this.addMode = false
    }
}