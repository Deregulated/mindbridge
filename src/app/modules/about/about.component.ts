import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  team = [
    {
      name: 'John Doe',
      role: 'Founder & CEO',
      bio: 'John has over 10 years of experience in the tech industry and is passionate about connecting people with knowledge.',
      avatar: '👨‍💼'
    },
    {
      name: 'Jane Smith',
      role: 'CTO',
      bio: 'Jane leads our technical team with expertise in scalable software architecture and user experience design.',
      avatar: '👩‍💻'
    },
    {
      name: 'Mike Johnson',
      role: 'Head of Community',
      bio: 'Mike ensures our community of clients and experts thrives through excellent support and engagement.',
      avatar: '👨‍🎓'
    }
  ];

  milestones = [
    { year: '2020', event: 'MindBridge founded with a vision to democratize access to expert knowledge' },
    { year: '2021', event: 'Launched our platform with 100+ experts and 1000+ clients' },
    { year: '2022', event: 'Expanded to 10 new countries and introduced mobile apps' },
    { year: '2023', event: 'Reached 10,000+ successful sessions and 500+ experts' }
  ];

  values = [
    {
      icon: '🌍',
      title: 'Accessibility',
      description: 'We strive to make expert guidance available to everyone, regardless of location or background.'
    },
    {
      icon: '⭐',
      title: 'Quality',
      description: 'Every expert on our platform is thoroughly vetted to ensure the highest standard of service.'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We continuously improve our platform to provide the best experience for both clients and experts.'
    },
    {
      icon: '🤝',
      title: 'Community',
      description: 'We foster a supportive environment where knowledge sharing and growth are celebrated.'
    }
  ];
}