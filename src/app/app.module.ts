import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { EventsAppComponent } from './events-app.component'

import { EventsListComponent, EventThumbnailComponent, 
          EventService, EventDetailsComponent, CreateEventComponent, 
          EventRouteActivator, EventListResolver, CreateSessionComponent, 
          SessionListComponent, DurationPipe  } from './events/index'

import { NavBarComponent } from './nav/navbar.component';
import { ToastrService } from './common/toastr.service';
import { CollapsibleWellComponent } from './common/collapsible-well.component';
import { Error404Component } from './errors/error-404.component';
import { AuthService } from '../app/user/auth.service';
import { appRoutes } from '../app/routes';
import { fromEventPattern } from 'rxjs';


export function checkDirtyState(component:CreateEventComponent) {
  if (component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel?')

    return true;
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    CreateSessionComponent,
    SessionListComponent,
    Error404Component,
    CollapsibleWellComponent,
    DurationPipe
  ],
  providers: [ 
    EventService, 
    ToastrService,
    EventListResolver,
    AuthService,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    },
    EventRouteActivator
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

