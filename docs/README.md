- RabbitMQ: `http://localhost:15672`

## Troubleshooting

### Common Issues

**Backend Won't Start:**
1. Check Python version: `python --version`
2. Verify dependencies: `pip list`
3. Check port availability: `lsof -i :8000`
4. Review logs: `docker-compose logs backend`

**Frontend Build Errors:**
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Check Node version: `node --version`
3. Verify TypeScript: `npx tsc --noEmit`

**Database Connection Issues:**
1. Verify containers running: `docker-compose ps`
2. Check network connectivity: `docker network ls`
3. Review connection strings in `.env`

**API Proxy Not Working:**
1. Verify Next.js rewrites in `next.config.js`
2. Check backend URL configuration
3. Test direct API calls: `curl http://localhost:8000/`

### Performance Optimization

**Backend:**
- Use async/await for I/O operations
- Implement connection pooling for databases
- Add Redis caching for frequent queries
- Use background tasks for heavy computations

**Frontend:**
- Implement code splitting with dynamic imports
- Use React.memo for expensive components
- Optimize bundle size with webpack-bundle-analyzer
- Add service worker for offline functionality

**Database:**
- Create indexes for frequently queried fields
- Use database connection pooling
- Implement query optimization
- Monitor slow queries

### Security Considerations

**Authentication:**
- Implement JWT tokens for API access
- Use HTTPS in production
- Add rate limiting to prevent abuse
- Validate all input data

**Data Protection:**
- Encrypt sensitive data at rest
- Use environment variables for secrets
- Implement proper CORS policies
- Add input sanitization

**Ethics & Compliance:**
- Regular ethics review processes
- Data privacy compliance (GDPR, CCPA)
- Research ethics board approval
- Bias detection and mitigation

### Deployment Checklist

**Pre-deployment:**
- [ ] All tests passing
- [ ] Security scan completed
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates installed
- [ ] Monitoring configured

**Post-deployment:**
- [ ] Health checks passing
- [ ] Logs monitoring active
- [ ] Performance metrics baseline
- [ ] Backup procedures tested
- [ ] Rollback plan verified

This completes the comprehensive documentation for the Universal Researcher AI project. Every file, function, and configuration has been meticulously documented to provide complete understanding of the system architecture, implementation details, and operational procedures.